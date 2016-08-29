'use strict';

describe('UserMethodService', function () {
    beforeEach(module('app'));

    var UserMethodService;
    var $q, UserService;
    var $qDeferStub, $qDeferSpy, expectedPromise;

    beforeEach(inject(function (_UserMethodService_, _$q_, _UserService_) {
        $q = _$q_;
        UserService = _UserService_;
        UserMethodService = _UserMethodService_;
    }));

    describe('#createUsers', function () {
        var UserServiceStub;

        it('positive case', function () {
            expectedPromise = 'POSITIVE';

            UserServiceStub = sinon.stub(UserService.prototype, '$save', function() {
                return {
                    then: function(callback) {
                        callback();
                    }
                };
            });

            $qDeferSpy = sinon.spy();
            $qDeferStub = sinon.stub($q, 'defer', function() {
                return {
                    resolve: $qDeferSpy,
                    promise: expectedPromise
                };
            });

            UserMethodService.createUser([expectedPromise]).should.be.equal(expectedPromise);
            $qDeferSpy.called.should.be.equal(true);
        });

        it('positive case', function () {
            expectedPromise = 'NEGATIVE';
            var REJECT_RESPONSE = {
                data: {reason: 'REJECT_INSERTION'}
            };

            UserServiceStub = sinon.stub(UserService.prototype, '$save', function() {
                return {
                    then: function(callbackPositive, callbackNegative) {
                        callbackNegative(REJECT_RESPONSE);
                    }
                };
            });

            $qDeferSpy = sinon.spy();
            $qDeferStub = sinon.stub($q, 'defer', function() {
                return {
                    reject: $qDeferSpy,
                    promise: expectedPromise
                };
            });

            UserMethodService.createUser([expectedPromise]).should.be.equal(expectedPromise);
            $qDeferSpy.should.have.been.calledWith(REJECT_RESPONSE.data.reason);
        });

        afterEach(function () {
            UserServiceStub.restore();
        });
    });

    describe('#updateUsers', function () {
        it('positive case', function () {
            expectedPromise = 'POSITIVE';

            $qDeferSpy = sinon.spy();
            $qDeferStub = sinon.stub($q, 'defer', function() {
                return {
                    resolve: $qDeferSpy,
                    promise: expectedPromise
                };
            });

            UserMethodService.updateUser({
                $update: function() {
                    return {
                        then: function(callbackPositive) {
                            callbackPositive();
                        }
                    };
                }
            }).should.be.equal(expectedPromise);

            $qDeferSpy.called.should.be.equal(true);
        });

        it('negative case', function () {
             expectedPromise = 'NEGATIVE';
             var REASON = 'REASON';

             $qDeferSpy = sinon.spy();
             $qDeferStub = sinon.stub($q, 'defer', function() {
                 return {
                     reject: $qDeferSpy,
                     promise: expectedPromise
                 };
             });

             UserMethodService.updateUser({
                 $update: function() {
                     return {
                         then: function(uselessCallbackPositive, callbackNegative) {
                             callbackNegative({
                                 data: {reason: REASON}
                             });
                         }
                     };
                 }
             }).should.be.equal(expectedPromise);

             $qDeferSpy.should.have.been.calledWith(REASON);
        });
    });

    describe('#deleteUsers', function () {
        var UserServiceStub;

        it('positive case', function () {
            expectedPromise = 'POSITIVE';

            UserServiceStub = sinon.stub(UserService.prototype, '$delete', function() {
                return {
                    then: function(callback) {
                        callback();
                    }
                };
            });

            $qDeferSpy = sinon.spy();
            $qDeferStub = sinon.stub($q, 'defer', function() {
                return {
                    resolve: $qDeferSpy,
                    promise: expectedPromise
                };
            });

            UserMethodService.deleteUser([expectedPromise]).should.be.equal(expectedPromise);
            $qDeferSpy.called.should.be.equal(true);
        });

        it('negative case', function () {
             expectedPromise = 'NEGATIVE';
             var REJECT_RESPONSE = {
                 data: {reason: 'REJECT_INSERTION'}
             };

             UserServiceStub = sinon.stub(UserService.prototype, '$delete', function() {
                 return {
                     then: function(callbackPositive, callbackNegative) {
                         callbackNegative(REJECT_RESPONSE);
                     }
                 };
             });

             $qDeferSpy = sinon.spy();
             $qDeferStub = sinon.stub($q, 'defer', function() {
                 return {
                     reject: $qDeferSpy,
                     promise: expectedPromise
                 };
             });

             UserMethodService.deleteUser([expectedPromise]).should.be.equal(expectedPromise);
             $qDeferSpy.should.have.been.calledWith(REJECT_RESPONSE.data.reason);
        });

        afterEach(function () {
            $qDeferStub.restore();
        });
    });


    afterEach(function () {
        $qDeferStub.restore();
    });
});