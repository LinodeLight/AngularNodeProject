describe("Unit: Testing Admin Controllers", function() {

    beforeEach(module('app'));

    var scope,
        usersData = {
            "data": [
                {
                    _id: "569976c21dad48f614cc8126",
                    name: "User",
                    username: "user",
                    email: "email@example.com",
                    salt: "jjiureunnJfG",
                    created_by: "569976c21dad48f614cc8125",
                    creation_date: "2016-03-28T06:04:50.669Z",
                    role: [
                        "admin"
                    ]
                }
            ]
        },
        userQueryStub,  ctrl;

    beforeEach(inject(function ($rootScope, $controller) {

        var usersDetailQuerySpy;

        usersDetailQuerySpy = sinon.spy(function () {
            return usersData.data;
        });

        userQueryStub = sinon.stub(UserService, 'query', usersDetailQuerySpy);

        scope = $rootScope.$new();
        ctrl = $controller('UserAdminCtrl', {
            $scope:  scope
        });
    }));

    it("loads the admin users data", function () {
        userQueryStub.called.should.be.equal(true);
        sinon.assert.calledWith(userQueryStub);
        scope.users.should.be.equal(usersData.data);
    });

    afterEach(function () {
        userQueryStub.restore();
    });
});

