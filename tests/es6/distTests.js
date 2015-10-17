"use strict";
/* global describe,it */

let Bluebird = require("bluebird");
let fs = Bluebird.promisifyAll(require("fs-extra"));
let Dist = require("../../").Dist;
let assert = require("assert");
let async = Bluebird.coroutine;

let testDownload = process.env.TEST_DOWNLOAD === "1";

describe("dist", function () {
    it("should download dist files if needed", function (done) {
        this.timeout(60000);
        async(function*() {
            let dist = new Dist();
            console.log("Internal path: " + dist.internalPath);
            if (testDownload) {
                yield fs.deleteAsync(dist.internalPath);
                assert(dist.downloaded === false);
                yield dist.ensureDownloaded();
                assert(dist.downloaded);
            }
            else {
                yield dist.ensureDownloaded();
            }
        })().nodeify(done);        
    });

});