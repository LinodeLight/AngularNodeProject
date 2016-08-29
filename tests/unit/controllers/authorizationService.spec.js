'use strict';

describe('AuthorizationSrvc', function () {
    beforeEach(module('app'));

    var AuthorizationSrvc;
    var $q, UserSrvc,expected, IdentitySrvc;

    var $qDeferStub, $qDeferSpy,$window, $httpBackend, expectedPromise;
    var  login = {username: 'username', password: 'password'};
    var returnData = {
        "success": "true",
        "user": {
            "_id": "569976c21dad48f614cc8125",
            "name": "User",
            "username": "user",
            "email": "user@example.com",
            "salt": "czxicjjxcjEWIjijcijsjijijsdjisjd",
            "creation_date": "2016-02-28T06:04:50.668Z",
            "role": ["admin"]
        }
    };
    beforeEach(inject(function (_AuthorizationSrvc_,_$window_, _$q_,_$httpBackend_, _IdentitySrvc_, _UserSrvc_) {
        $q = _$q_;
        $window = _$window_;
        $httpBackend = _$httpBackend_;
        UserSrvc = _UserSrvc_;
        IdentitySrvc = _IdentitySrvc_;
        AuthorizationSrvc = _AuthorizationSrvc_;

    }));

    describe('#AuthorizationenticateUser', function () {

        it('positive case', function () {

            expectedPromise = true;

            $qDeferSpy = sinon.spy();
            $qDeferStub = sinon.stub($q, 'defer', function () {
                return {
                    resolve: $qDeferSpy,
                    promise: expectedPromise
                };
            });

            $httpBackend.expectPOST('/login',{"username":"username","password":"password"}).respond(200,returnData);
            AuthorizationSrvc.authenticateUser('username','password').should.be.equal(expectedPromise);

        });

        it('negative case', function () {

            expectedPromise = false;

            $qDeferSpy = sinon.spy();
            $qDeferStub = sinon.stub($q, 'defer', function () {
                return {
                    resolve: $qDeferSpy,
                    promise: expectedPromise
                };
            });

            $httpBackend.expectPOST('/login',{"username":"username","password":"password"}).respond(404,returnData);
            AuthorizationSrvc.authenticateUser('username','password').should.be.equal(expectedPromise);
        });

        afterEach(function () {
            $qDeferStub.restore();
            $httpBackend.flush();
        });

    });

    describe('#logoutUser', function () {

        it('positive case', function () {

            expectedPromise = true;

            $qDeferSpy = sinon.spy();
            $qDeferStub = sinon.stub($q, 'defer', function () {
                return {
                    resolve: $qDeferSpy,
                    promise: expectedPromise
                };
            });

            $httpBackend.expectPOST('/logout',{"logout":true}).respond(200);

            AuthorizationSrvc.logoutUser().should.be.equal(expectedPromise);
        });

        it('negative case', function () {

            expectedPromise = false;

            $qDeferSpy = sinon.spy();
            $qDeferStub = sinon.stub($q, 'defer', function () {
                return {
                    resolve: $qDeferSpy,
                    promise: expectedPromise
                };
            });

            $httpBackend.expectPOST('/logout',{"logout":true}).respond(404);

            AuthorizationSrvc.logoutUser().should.be.equal(expectedPromise);
        });

        afterEach(function () {
            $qDeferStub.restore();
            $httpBackend.flush();
        });

    });

    describe('#authorizeAuthenticatedCurrentUserForRoute', function () {

        it('positive case', function () {

            expected = true;

            IdentitySrvc.currentUser = returnData.user;
            AuthorizationSrvc.authorizeCurrentUserForRoute(returnData.user.role[0]).should.be.equal(expected);
        });

        it('negative case', function () {

            expected = 'not authorized';

            AuthorizationSrvc.authorizeCurrentUserForRoute().$$state.value.should.be.equal(expected);
        });

    });


    describe('#authorizeAuthenticatedUserForRoute', function () {

        it('positive case', function () {

            expected = true;
            IdentitySrvc.currentUser = returnData.user;

            AuthorizationSrvc.authorizeAuthenticatedUserForRoute().should.be.equal(expected);
        });

        it('negative case', function () {

            expected = 'not authorized';

            AuthorizationService.authorizeAuthenticatedUserForRoute().$$state.value.should.be.equal(expected);
        });

    });
});


