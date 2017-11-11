var path = require('path');
var Nightmare = require("nightmare");
require('nightmare-upload')(Nightmare);

var expect = require("chai").expect,
    BASE_URL = "http://localhost:8080/",
    onError = (err) => {
        console.error("Test-runner failed:", err);
    },
    browser = new Nightmare({
        show: true,
        typeInterval: 40,
        pollInterval: 100
    });

describe("Timen'Dinero Tests", function () {

    this.timeout(100000);

    after(() => {
        browser.end().then(() => {
            console.log("Completed");
        });
    });

    //Tests
    it("should add a new client with external ID#999", function (done) {
        browser
            .goto(BASE_URL)
            .wait(8000)
            // Click add client button from side panel
            .click(".button")
            .type('form[action*="/company/add"] [name=client_id]', 999)
            .type('form[action*="/company/add"] [name=company_name]', 'Lazy Cat Inc.')
            .type('form[action*="/company/add"] [name=contact_person]', 'Mary Johnson')
            .type('form[action*="/company/add"] [name=email_address]', 'maryj@lazycat.com')
            .type('form[action*="/company/add"] [name=phone]', '303-555-1234')
            .type('form[action*="/company/add"] [name=mailing_address]', '555 Corporate Dr. Denver, CO 80219')
            .upload('form[action*="/company/add"] [name=logo]', path.dirname(__dirname) + '/lazy_cat.jpg')
            .wait(5000)
            .click('#newClient')
            .wait(5000)
            .then(() => {
                done();
            })
            .catch(onError);
    });

    it("should add new project for newly created client external ID# 999", function (done) {
        browser
            .goto(BASE_URL)
            .wait(5000)
            .goto(BASE_URL + "admin/999")
            .click("#addFirstProject")
            .wait(1000)
            .type('form[action*="/admin/index/999"] [name=title]', 'Cap Nap Scheduling App')
            .type('form[action*="/admin/index/999"] [name=task]', 'Scoping')
            .type('form[action*="/admin/index/999"] [name=hours]', '2')
            .type('form[action*="/admin/index/999"] [name=rate]', '75.00')
            .type('form[action*="/admin/index/999"] [name=description]', 'Met with client on requirements.')
            .type('form[action*="/admin/index/999"] [name=notes]', 'This client has a ton of requirements to go through. There will be a lot of work to do! When an unknown printerelectronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.')
            .wait(5000)
            .click('form[action*="/admin/index/999"] [type=submit]')
            .wait(10000)
            .then(() => {
                done();
            })
            .catch(onError);
    });

    it("should edit projects details for newly created client external ID# 999", function (done) {
        browser
            .goto(BASE_URL + "admin/999")
            .wait(20000)
            .click(".edit-project")
            .wait(1000)
            .type('form[action*="/admin/edit"] [name=task]', ' and Planning')
            .wait(5000)
            .click('form[action*="/admin/edit"] [type=submit]')
            .wait(13000)
            .then(() => {
                done();
            })
            .catch(onError);
    });


    it("should delete client external ID# 999", function (done) {
        browser
            .goto(BASE_URL + "company/profile/999")
            .wait(3000)
            .click(".fa-trash")
            .wait(3000)
            .click('#delete-company')
            .wait(5000)
            .then(() => {
                done();
            })
            .catch(onError);
    });
    

});