"use strict";
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const express = require("express");
const http = require("http");
const path = require("path");
const prpl = require("../prpl");
const chrome = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';
suite('prpl server', function () {
    let server;
    let host;
    let port;
    function startServer(root, config) {
        const handler = prpl.makeHandler(root, config);
        server = http.createServer((request, response) => {
            // To help test caching behavior, if the request URL includes this
            // magic string, we'll set the cache-control header to something
            // custom before calling prpl-handler. This is how we allow users to
            // take over control of the cache-control header.
            if (request.url && request.url.includes('custom-cache')) {
                response.setHeader('Cache-Control', 'custom-cache');
            }
            handler(request, response);
        });
        return new Promise((resolve) => {
            server.listen(/* random */ 0, '127.0.0.1', () => {
                host = server.address().address;
                port = server.address().port;
                resolve();
            });
        });
    }
    function get(path, ua, headers) {
        return new Promise((resolve) => {
            const getHeaders = Object.assign({ 'user-agent': ua || '' }, headers);
            http.get({ host, port, path, headers: getHeaders }, (response) => {
                const code = response.statusCode;
                const headers = response.headers;
                let data = '';
                response.on('data', (chunk) => data += chunk);
                response.on('end', () => resolve({ code, data, headers }));
            });
        });
    }
    function checkPlainTextError(expectCode, expectData, res) {
        chai_1.assert.equal(res.code, expectCode);
        chai_1.assert.equal(res.data, expectData);
        chai_1.assert.equal(res.headers['content-type'], 'text/plain');
        chai_1.assert.equal(res.headers['content-length'], String(expectData.length));
    }
    suite('configured with multiple builds', () => {
        suiteSetup(() => __awaiter(this, void 0, void 0, function* () {
            yield startServer(path.join('src', 'test', 'static'), {
                builds: [
                    {
                        name: 'fallback',
                    },
                    {
                        name: 'es2015',
                        browserCapabilities: ['es2015'],
                    },
                ],
            });
        }));
        suiteTeardown((done) => {
            server.close(done);
        });
        suite('with low capability user agent', () => {
            test('serves entrypoint from root', () => __awaiter(this, void 0, void 0, function* () {
                const { code, data } = yield get('/');
                chai_1.assert.equal(code, 200);
                chai_1.assert.include(data, 'fallback entrypoint');
            }));
            test('serves entrypoint for application route', () => __awaiter(this, void 0, void 0, function* () {
                const { code, data } = yield get('/foo/bar');
                chai_1.assert.equal(code, 200);
                chai_1.assert.include(data, 'fallback entrypoint');
            }));
            test('serves a fragment resource', () => __awaiter(this, void 0, void 0, function* () {
                const { code, data } = yield get('/fallback/fragment.html');
                chai_1.assert.equal(code, 200);
                chai_1.assert.include(data, 'fallback fragment');
            }));
            test('serves a 404 for missing file with extension', () => __awaiter(this, void 0, void 0, function* () {
                checkPlainTextError(404, 'Not Found', yield get('/foo.png'));
            }));
            test('forbids traversal outside root', () => __awaiter(this, void 0, void 0, function* () {
                checkPlainTextError(403, 'Forbidden', yield get('/../secrets'));
            }));
            test('forbids traversal outside root with matching prefix', () => __awaiter(this, void 0, void 0, function* () {
                // Edge case where the resolved request path naively matches the root
                // directory by prefix even though it's actually a sibling, not a child
                // ("/static-secrets" begins with "/static").
                checkPlainTextError(403, 'Forbidden', yield get('/../static-secrets'));
            }));
        });
        suite('with high capability user agent', () => {
            test('serves entrypoint from root', () => __awaiter(this, void 0, void 0, function* () {
                const { code, data } = yield get('/', chrome);
                chai_1.assert.equal(code, 200);
                chai_1.assert.include(data, 'es2015 entrypoint');
            }));
            test('serves entrypoint for application route', () => __awaiter(this, void 0, void 0, function* () {
                const { code, data } = yield get('/foo/bar', chrome);
                chai_1.assert.equal(code, 200);
                chai_1.assert.include(data, 'es2015 entrypoint');
            }));
            test('serves a fragment resource', () => __awaiter(this, void 0, void 0, function* () {
                const { code, data } = yield get('/es2015/fragment.html', chrome);
                chai_1.assert.equal(code, 200);
                chai_1.assert.include(data, 'es2015 fragment');
            }));
            test('serves a 404 for missing file with extension', () => __awaiter(this, void 0, void 0, function* () {
                checkPlainTextError(404, 'Not Found', yield get('/foo.png'));
            }));
            test('sets push headers for fragment', () => __awaiter(this, void 0, void 0, function* () {
                const { headers } = yield get('/es2015/fragment.html', chrome);
                chai_1.assert.equal(headers['link'], '</es2015/baz.html>; rel=preload; as=document');
            }));
            test('sets push headers for explicit entrypoint', () => __awaiter(this, void 0, void 0, function* () {
                const { headers } = yield get('/es2015/index.html', chrome);
                chai_1.assert.equal(headers['link'], ('</es2015/fragment.html>; rel=preload; as=document, ' +
                    '</es2015/serviceworker.js>; rel=preload; as=script'));
            }));
            test('sets push headers for application route', () => __awaiter(this, void 0, void 0, function* () {
                const { headers } = yield get('/foo/bar', chrome);
                chai_1.assert.equal(headers['link'], 
                // Note these headers are both those defined for the entrypoint by
                // filename, and by application route.
                ('</es2015/foo.html>; rel=preload; as=document, ' +
                    '</es2015/fragment.html>; rel=preload; as=document, ' +
                    '</es2015/serviceworker.js>; rel=preload; as=script'));
            }));
            test('sets service-worker-allowed header', () => __awaiter(this, void 0, void 0, function* () {
                const { headers } = yield get('/es2015/service-worker.js', chrome);
                chai_1.assert.equal(headers['service-worker-allowed'], '/');
            }));
            test('automatically unregister missing service workers', () => __awaiter(this, void 0, void 0, function* () {
                const { code, data, headers } = yield get('/service-worker.js', chrome);
                chai_1.assert.equal(code, 200);
                chai_1.assert.equal(headers['content-type'], 'application/javascript');
                chai_1.assert.equal(headers['service-worker-allowed'], '/');
                chai_1.assert.include(data, 'registration.unregister');
            }));
            test('sets default cache header on static file', () => __awaiter(this, void 0, void 0, function* () {
                const { headers } = yield get('/es2015/fragment.html', chrome);
                chai_1.assert.equal(headers['cache-control'], 'max-age=60');
            }));
            test('sets zero cache header on entrypoint', () => __awaiter(this, void 0, void 0, function* () {
                const { headers } = yield get('/foo/bar', chrome);
                chai_1.assert.equal(headers['cache-control'], 'max-age=0');
            }));
            test('doesn\'t set cache header if already set', () => __awaiter(this, void 0, void 0, function* () {
                // See above explanation of `custom-cache` magic.
                const { headers } = yield get('/foo/bar?custom-cache', chrome);
                chai_1.assert.equal(headers['cache-control'], 'custom-cache');
            }));
            test('sends etag response header', () => __awaiter(this, void 0, void 0, function* () {
                const { headers } = yield get('/es2015/fragment.html', chrome);
                chai_1.assert.isNotEmpty(headers['etag']);
            }));
            test('respects etag request header', () => __awaiter(this, void 0, void 0, function* () {
                const { headers } = yield get('/es2015/fragment.html', chrome);
                const { code, data } = yield get('/es2015/fragment.html', chrome, {
                    'If-None-Match': headers['etag'],
                });
                chai_1.assert.equal(code, 304);
                chai_1.assert.equal(data, '');
            }));
        });
    });
    suite('configured with no fallback build', () => {
        suiteSetup(() => __awaiter(this, void 0, void 0, function* () {
            yield startServer(path.join('src', 'test', 'static'), {
                builds: [
                    {
                        name: 'es2015',
                        browserCapabilities: ['es2015'],
                    },
                ],
            });
        }));
        suiteTeardown((done) => {
            server.close(done);
        });
        test('serves 500 error to unsupported browser', () => __awaiter(this, void 0, void 0, function* () {
            checkPlainTextError(500, 'This browser is not supported.', yield get('/'));
        }));
    });
    suite('configured with unregisterMissingServiceWorkers disabled', () => {
        suiteSetup(() => __awaiter(this, void 0, void 0, function* () {
            yield startServer(path.join('src', 'test', 'static'), {
                builds: [
                    {
                        name: 'es2015',
                        browserCapabilities: ['es2015'],
                    },
                ],
                unregisterMissingServiceWorkers: false,
            });
        }));
        suiteTeardown((done) => {
            server.close(done);
        });
        test('sends 404 for missing service worker', () => __awaiter(this, void 0, void 0, function* () {
            const { code } = yield get('/service-worker.js', chrome);
            chai_1.assert.equal(code, 404);
        }));
    });
    suite('standalone with no builds', () => {
        suiteSetup(() => __awaiter(this, void 0, void 0, function* () {
            yield startServer(path.join('src', 'test', 'static', 'standalone'));
        }));
        suiteTeardown((done) => {
            server.close(done);
        });
        test('serves index.html by default', () => __awaiter(this, void 0, void 0, function* () {
            const { code, data } = yield get('/');
            chai_1.assert.equal(code, 200);
            chai_1.assert.include(data, 'standalone entrypoint');
        }));
        test('services static files', () => __awaiter(this, void 0, void 0, function* () {
            const { code, data } = yield get('/fragment.html');
            chai_1.assert.equal(code, 200);
            chai_1.assert.include(data, 'standalone fragment');
        }));
        test('sets push manifest link headers', () => __awaiter(this, void 0, void 0, function* () {
            const { headers } = yield get('/', chrome);
            chai_1.assert.equal(headers['link'], '</fragment.html>; rel=preload; as=document');
        }));
    });
    suite('configured with express error forwarding', () => {
        suiteSetup((done) => {
            const app = express();
            app.use(prpl.makeHandler(path.join('src', 'test', 'static'), {
                forwardErrors: true,
                builds: [
                    {
                        name: 'es2015',
                        browserCapabilities: ['es2015'],
                    },
                ]
            }));
            app.use((error, _request, response, _next) => {
                response.statusCode = error.status;
                response.setHeader('Content-Type', 'text/plain');
                response.end(`custom ${error.status}: ${error.message}`);
            });
            server = app.listen(/* random */ 0, '127.0.0.1', () => {
                host = server.address().address;
                port = server.address().port;
                done();
            });
        });
        suiteTeardown((done) => {
            server.close(done);
        });
        test('forwards error for 404 not found', () => __awaiter(this, void 0, void 0, function* () {
            checkPlainTextError(404, 'custom 404: Not Found', yield get('/fragment/error.html'));
        }));
        test('forwards error for directory traversal 403', () => __awaiter(this, void 0, void 0, function* () {
            checkPlainTextError(403, 'custom 403: Forbidden', yield get('/../secrets'));
        }));
        test('forwards error for unsupported browser 500', () => __awaiter(this, void 0, void 0, function* () {
            checkPlainTextError(500, 'custom 500: This browser is not supported.', yield get('/'));
        }));
    });
});
//# sourceMappingURL=prpl_test.js.map