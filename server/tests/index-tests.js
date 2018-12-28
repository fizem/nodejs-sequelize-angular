let mocha = require('mocha');
let app = require ('../index');
let request = require('supertest');
let models = require('../db/models');
let uuidv4 = require('uuid/v4');
let assert = require('assert');

describe("Test to check get response", function () {
	before (function () {
		models.Resource.destroy ({
				where: {},
			truncate: true 
		});
	});

	after(function() {
		 models.Resource.destroy ({
				where: {},
			truncate: true 
		});
	});

	it("Retrieving one valid resource", function(done) {
		let resource = models.Resource.build({
			id: uuidv4(),
			NAME: 'ApplicationTestA',
			DISPLAYNAME: 'ApplicationTestA',
			TECHNICALNAME: 'ApplicationTestA',
			STATUS: 'Active',
			RESOURCEOWNER: 'Farid IZEM',
			RESOURCEMANAGER: 'Florent CAPTIER',
			ARCHITECTE: 'Jean-Félix NOUBISSIE-TCHAKO'
		});
		resource.save()
		.then (function (resource) {
				request(app)
				.get('/resource/'+resource.id)
				.expect(200)
				.expect(function(res){
					assert.equal (res.body.id,resource.id);
					assert.equal (res.body.NAME,resource.NAME);
					assert.equal (res.body.DISPLAYNAME,resource.DISPLAYNAME);
				})	
				.end(function (err,res)  {
					if (err) return done(err);
					done();
				});
			});
	});

	it("Retrieving one invalid resource", function(done) {
		request(app)
		.get("/resource/farid")
		.set ('Accept','application/json')
		.expect(400)
		.end(function (err,res) {
			if (err) return (done(err));
			done();
		});
	});

	it("Retrieving all resources", function(done) {
		request(app)
		.get("/resource")
		.set('Accept','application/json')
		.expect(200)
		.end(function (err,res)  {
			if (err) return done(err);
			done();
		});
	});

	it ("Posting a valid resource", function(done) {
		let resource = ({ name: 'ApplicationTestB',
							displayName: 'ApplicationTestB',
							technicalName: 'ApplicationTestB',
							status: 'Active',
							resourceOwner: 'Florent CAPTIER',
							resourceManager: 'Anthony MARQUES',
							architecte: 'Farid IZEM'});
		request(app)
		.post("/resource")
		.set('Content-Type', 'application/json')
		.send(resource)
		.expect(201)
		.expect (function(res) {
			assert.equal (resource.name, res.body.NAME);
			assert.equal (resource.displayName,res.body.DISPLAYNAME);
			assert.equal (resource.technicalName,res.body.TECHNICALNAME);
		})
		.end(function (err,res)  {
				if (err) return done(err);
				done();
		});
	});

	it ("Posting an invalid resource", function(done) {
		let resource = ({ name: 'ApplicationTest1234',
							displayName: 'ApplicationTestC',
							technicalName: 'ApplicationTest5678',
							status: 'Active',
							resourceOwner: 'Florent CAPTIER',
							resourceManager: 'Anthony MARQUES',
							architecte: 'Farid IZEM'});
		request(app)
		.post("/resource")
		.set('Content-Type', 'application/json')
		.send(resource)
		.expect('{"400":"bad request"}')
		.end(function (err,res)  {
				if (err) return done(err);
				done();
		});
	});
});
