 (function (module) {
                                                mifosX.controllers = _.extend(module, {
                                                MpesaTransactionsController: function ($rootScope, scope, resourceFactory, location, http) {
                                                scope.transactions = [];
                                                        scope.transaction = [];
                                                        scope.searchResults = [];
                                                        scope.actualTransactions = [];
                                                        scope.searchText = "";
                                                        scope.routeTo = function (id) {
                                                        location.path('/viewmpesatransaction/' + id);
                                                        };
                                                        var link = $rootScope.hostUrl;
                                                        link = link.substring(0, link.length - 4);
                                                        console.log(link);
                                                        http({
                                                        method: 'POST',
                                                                url: link + "/apis/mpesa.php",
                                                                data:'{}'
                                                        }).then(function (data) {
                                                scope.transactions = data.data;
                                                        //   console.log(transactions);


                                                });
                                                        scope.TransactionsPerPage = 20;
                                                        scope.searchTransactions = function () {
 scope.TransactionsPerPage = 1000;
                                                        scope.searchResults = [];
                                                                scope.filterText = "";
                                                                var searchString = scope.searchText;
                                                                //    alert(searchString);
                                                                searchString = searchString.replace(/(^"|"$)/g, '');
                                                                var exactMatch = false;
                                                                var n = searchString.localeCompare(scope.searchText);
                                                                var link = $rootScope.hostUrl;
                                                                link = link.substring(0, link.length - 4);
                                                                console.log(link);
                                                                http({
                                                                method: 'POST',
                                                                        url: link + "/apis/mpesa.php",
                                                                        data:{filter:searchString}
                                                                }).then(function (data) {
                                                        var sTransactions = data.data;
                                                                //  console.log(sTransactions);
                                                                var arrayLength = sTransactions.length;
                                                                for (var i = 0; i < arrayLength; i++) {
                                                        var result = sTransactions[i];
                                                                var transaction = {};
                                                                var actualTransactions = {};
                                                                transaction.name = result.name;
                                                                transaction.transactionDate = result.transactionDate;
                                                                transaction.phone = result.phone;
                                                                transaction.amount = result.amount;
                                                                transaction.receipt = result.receipt;
                                                                transaction.accountNumber = result.accountNumber;
                                                                transaction.clientId = result.clientId;
                                                                transaction.id = result.id;
                                                                scope.actualTransactions.push(transaction);
                                                        }
                                                        var numberOfTransactions = scope.actualTransactions.length;
                                                                scope.totalTransactions = numberOfTransactions;
                                                                scope.transactions = scope.actualTransactions.slice(0, scope.TransactionsPerPage);
                                                        });
                                                        }


//            resourceFactory.mpesaTrasactionsListResource.geTransactions(function (data) {
//                scope.trasactions = data;
//                console.log(data);
//            });
                                                }
                                                });
                                                        mifosX.ng.application.controller('MpesaTransactionsController', ['$rootScope', '$scope', 'ResourceFactory', '$location', '$http', mifosX.controllers.MpesaTransactionsController]).run(function ($log) {
                                                $log.info("MpesaTransactionsController initialized");
                                                });
                                                }
                                                (mifosX.controllers || {}));
                                                ;