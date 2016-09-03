describe('------ Shared Services----', function () {


    beforeEach(function () {
        angular.mock.module('configurables');
    });

    describe('>>> Testing => shared services : $shareManager : Set API object', function () {

        var $shareManager;

        beforeEach(function () {
            module(function ($shareManageProvider) {
                $shareManageProvider.API = { url: { uri: { people: function () { } } } }
            });

            inject(function (_$shareManager_) {
                $shareManager = _$shareManager_;
            });
        });

        it('Should get the configured API and it should be of type function', function () {
            expect($shareManager.getAPI().url.uri.people).to.be.a('function');
        });

    });


});