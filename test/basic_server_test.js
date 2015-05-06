'use strict';

var chai = require('chai')
var chaiHttp = require('chai-http');
var expect = chai.expect;
var assert = require('assert');

chai.use(chaiHttp);

require('../server');

describe('/time', function() {
	it('should respond to our server request', function(done) {
		chai.request('localhost:3000')
			.get('/time')
			.end(function(err, res) {
				console.log(res);
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
			var body = new Date();
			expect(body).to.be.an.instanceof(Date);
				expect(res.body).to.be.not.eql(null);
				done();
			});
	});

	it('should find a 404', function(done) {
		chai.request('localhost:3000')
		.get('/somepagethatdoesnotexist')
		.end(function(err, res) {
			console.log(err);
			expect(err).to.eql(null);
			expect(res.status).to.eql(404);
			expect(res.body.msg).to.eql('404 could not find page');
			done();
		});
	});

	it('should greet by name for /greet/"name"', function(done) {
		chai.request('localhost:3000')
		.get('/greet/rainer')
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(res.status).to.eql(200);
			expect(res.body).to.eql({hello: 'rainer'});
			done();
		});
	});
});