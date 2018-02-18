angular.module('myApp').factory('EthereumFactory', function($rootScope, $http, FileSaver, $window, sharedProperties) {
    var _factory = {
        getAccounts: function(cb) {
            web3.eth.getAccounts(function(err, accs) {
                if (err != null) {
                    console.log(err);
                    alert("There was an error fetching your accounts.");
                    return cb(undefined);
                }
                if (accs.length == 0) {
                    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                    return cb(undefined);
                }
                sharedProperties.setAccountSelected(accs[0])
                console.log(sharedProperties.getAccountSelected());
                cb(accs);
            });
        },

	fund: function(from) {
            var listeEmails = ''
            $http({
                method: 'POST',
                url: 'http://blockchain.maltem.com:8083/fund',
                headers: {
                    'Content-Type': undefined
                },
                data: {
                    address: from,
                },
                transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    })
                    return formData;
                }
            })
            .success(function (data) {
            })
            .error(function (data, status) {
            })
        },

        getAdmins: function(cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getAdmins.call().then(function(admintab) {
                    var admins = []
                    admintab.forEach(function(address, index) {
                        sign.getEmail.call(address).then(function(email) {
                            admins.push(email);
                            if (index == admintab.length - 1) {
                                return cb(admins)
                            }
                            /*var option = document.createElement('option')
                            option.innerHTML = email
                            admins.appendChild(option)*/
                        })
                    })
                })
            })
        },

        createAccount: function(from, email, proof1, proof2, admin_value, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                _factory.hashDocument(proof1, function(hash1) {
                    _factory.hashDocument(proof2, function(hash2) {
                        console.log('email : ' + email);
                        console.log('h1 : ' + hash1.toString());
                        console.log('h2 : ' + hash2.toString());
                        console.log('admin : ' + admin_value);
                        sign.createSignataire(email, hash1.toString(), hash2.toString(), admin_value, 'name', 'firstName', {
                          from: from,
                          gas: 955000
                        }).then(function(value) {
                          console.log(email + ' is now register')
                          cb([hash1,hash2])
                        })
                    })
                })
            })
        },

        validateAccount: function(email, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getWallet(email).then(function(address) {
                    sign.validerSignataire(address, {
                        from: accounts[0],
                        gas: 155000
                    }).then(function(value) {
                        console.log(email + ' is now validate')
                        cb()
                    })
                })
            })
        },

        /*convertEmailsToAdress: function(emails, cb) {
            var list = []
            $rootScope.OpenSignature.deployed().then(function(sign) {
                emails.forEach(function(email, index) {
                    sign.getWallet(email).then(function(address) {
                        list.push(address)
                        if (index == emails.length - 1) {
                            cb(list)
                        }
                    })
                })
            })
        },*/


        convertEmailsToAdress: function(emails, cb) {
            var list = []
            $rootScope.OpenSignature.deployed().then(function(sign) {
                emails.forEach(function(email, index) {
                    sign.getWallet(email).then(function(address) {
                        sign.getSignataireExist(address).then(function(exist) {
                            if (exist == true) {
                                list.push(address)
                                if (index == emails.length - 1) {
                                    cb(list)
                                }
                            }
                            else {
                                return alert('error email unknown!')
                            }
                        })
                    })
                })
            })
        },


        addDocument: function(from, emails, file, cb) {
            console.log('addDocument');
            var hash
            var listaddress
            _factory.convertEmailsToAdress(emails, function(listaddress) {
                _factory.hashDocument(file, function(hash) {
                    $rootScope.OpenSignature.deployed().then(function(sign) {
                        //console.log(hash)
                        sign.addDocToSign(hash.toString(), listaddress, {
                            from: from,
                            gas: 955000
                        }).then(function(value) {
                            console.log('doc created')
                            cb(hash)
                        })
                    })
                })
            })
        },

        arrayBufferToWordArray: function(ab) {
            var i8a = new Uint8Array(ab);
            var a = [];
            for (var i = 0; i < i8a.length; i += 4) {
                a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
            }
            return CryptoJS.lib.WordArray.create(a, i8a.length);
        },

        hashDocument: function(file, cb) {
            console.log('hashdocument');

            var reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = function(e) {
                var hash = CryptoJS.SHA256(_factory.arrayBufferToWordArray(reader.result))
                console.log('hash : ' + hash);
                cb(hash)
            }
        },

        signDocument: function(from, num, cb) {
            //console.log(from);
            //console.log(num);
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getLengthSignature().then(function(docsLength) {
                    if (num >= docsLength) {
                        return alert('Error document not found !')
                    }
                    sign.docSignedby(num, from).then(function(result) {
                        if(result == 'no') {
                            sign.signDoc(num, {from: from,gas: 955000}).then(function(value) {
                                console.log('doc signé')
                                cb()
                            }).catch(function(e) {
                                // could be implement better
                        				return alert('Your not concerned by this document !')
                      			});
                        }
                        else {
                            return alert('You already signed the document !')
                        }
                    })
                }).catch(function(e) {
                  // could be implement better
                  //return alert('error document not found')
          			});
            })
        },
        refuseDocument: function(from, num, cb) {
            //console.log(from);
            //console.log(num);
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getLengthSignature().then(function(docsLength) {
                    if (num >= docsLength) {
                        return alert('Error document not found !')
                    }
                    sign.docSignedby(num, from).then(function(result) {
                        if(result == 'no') {
                            sign.refuseDoc(num, {from: from,gas: 955000}).then(function(value) {
                                console.log('refus reçu')
                                cb()
                            }).catch(function(e) {
                              // could be implement better
                                return alert('Your not concerned by this document !')
                            });
                        }
                        else {
                            return alert('You already signed the document !')
                        }
                    })
                }).catch(function(e) {
                    // could be implement better
                    //return alert('error document not found')
                });
            })
        },
        makeAdmin: function(from, email, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getWallet.call(email).then(function(address) {
                    sign.makeAdmin(address, {
                        from: from,
                        gas: 955000
                    }).then(function(value) {
                        console.log(email + ' is now Admin')
                        cb()
                    })
                })
            })
        },

        userExist: function (address, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getSignataireExist.call(address).then(function(value) {
                    cb(value)
                })
            })
        },

        getEmail: function (address, cb) {
            //console.log(address);
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getEmail.call(address).then(function(email) {
                    cb(email)
                })
            })
        },

        getAdminPendingUsers: function (email, cb) {
            console.log(email);
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getAdminPendingUsers.call(email).then(function(address) {
                    var tab = []
                    if (address.length == 0) {
                        cb()
                    }
                    for (let i = 0; i < address.length; i++) {
                        _factory.getEmail(address[i], function(email2) {
                            tab[i] = email2
                            // send a callback for each address
                            // this is probably not the good way to do it
                            cb(email2)
                        })
                    }
                    // this should be the good way to do it
                    //cb(tab)
                })
            })
        },


        /*getAdminPendingUsers: function (email, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getAdminPendingUsers.call(email).then(function(address) {
                    var tab = []
                    for (let i = 0; i < address.length; i++) {
                        _factory.getEmail(address[i], function(email2) {
                            tab[i] = email2
                            //tab[i] = address[i]
                            //tab[i].email2 = email2
                            if(i == address.length - 1) {
                              console.log('for finish');
                            }
                        })
                    }
                    console.log('callback call');
                    cb(tab)
                })
            })
        },*/

        userAdmin: function (address, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getSignataireAdmin.call(address).then(function(value) {
                    cb(value)
                })
            })
        },

        userStatus: function(email, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getWallet.call(email).then(function(wallet) {
                    sign.getSignataire.call(wallet).then(function(value) {
                        var result = {
                            address: wallet,
                            email: value[0],
                            doc1: value[1],
                            doc2: value[2],
                            validate: value[3],
                            referent: value[4],
                            admin: value[5],
                            documents: value[6]
                        }
                        //console.log(value)
                        cb(result)
                        /*sign.getWallet(value[4]).then(function(wallet_ref) {
                            referent.innerHTML = referent.innerHTML + ' referent address : ' + wallet_ref
                        })*/
                    })
                })
            })
        },

        validateUser: function(from, email, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getWallet(email).then(function(address) {
                    sign.validerSignataire(address, {
                        from: from,
                        gas: 155000
                    }).then(function(value) {
                        console.log(email + ' is now validate')
                        cb()
                    })
                })
            })
        },

        refuseUser: function(from, email, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getWallet(email).then(function(address) {
                    sign.refuseSignataire(address, {
                        from: from,
                        gas: 155000
                    }).then(function(value) {
                        console.log(email + ' is now refuse')
                        cb()
                    })
                })
            })
        },

        documentSignedBy: function(address, docId, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.docSignedby(email, docId).then(function(value) {
                    cb(value)
                })
            })
        },
        documentSignedbyAll: function(docId, cb) {
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.docSignedbyAll(docId).then(function(value) {
                    cb(value)
                })
            })
        },

        documentStatusAll: function(cb) {
            var documents = []
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getLengthSignature.call().then(function(size) {
                    for (let i = 0; i < size; i++) {
                        var document
                        _factory.documentStatus(i, function(document) {
                            documents.push(document)
                            if (documents.length == size) {
                                cb(documents)
                            }
                        })
                    }
                })
            })
        },
        documentStatusByFive: function(nb, cb) {
            var delta = 5
            var documents = []
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getLengthSignature.call().then(function(size) {
                    for (let i = size - nb - 1; i > size - nb - delta - 1 && i >= 0 && i <= size; i--) {
                        var document
                        _factory.documentStatus(i, function(document) {
                            documents.push(document)
                            cb(documents)
                        })
                    }
                })
            })
        },
        documentStatusListByFive: function(nb, nums, cb) {
            var delta = 5
            var documents = []
            $rootScope.OpenSignature.deployed().then(function(sign) {
                //for (let i = 0; i < nums.length; i++) {
                for (let i = nums.length - nb - 1; i > nums.length - nb - delta - 1 && i >= 0 && i <= nums.length; i--) {
                    var document
                    _factory.documentStatus(nums[i], function(document) {
                        documents.push(document)
                        //if (documents.length == nums.length) {
                        cb(documents)
                        //}
                    })
                }
            })
        },
        documentStatusList: function(nums, cb) {
            var documents = []
            $rootScope.OpenSignature.deployed().then(function(sign) {
                    for (let i = 0; i < nums.length; i++) {
                        var document
                        _factory.documentStatus(nums[i], function(document) {
                            documents.push(document)
                            if (documents.length == nums.length) {
                                cb(documents)
                            }
                        })
                    }
            })
        },


        documentStatus: function(num, cb) {
            var doc = {}
            doc.signataires = []
            $rootScope.OpenSignature.deployed().then(function(sign) {
                sign.getSignature(num).then(function(signature) {
                    var signataires
                    doc.id = num
                    doc.hash = signature[0]
                    doc.status = signature[3]

                    /*$rootScope.ipfs.files.cat(doc.hash, function (err, stream) {
                      var res = ''

                      stream.on('data', function (chunk) {
                        res += chunk.toString()
                        //console.log(res);
                      })

                      // file will be a stream containing the data of the file requested
                    })*/
                    doc.nbSignature = signature[2]
                    if (signature[2] == signature[1].length) {
                        doc.signedByAll = true
                    } else {
                        doc.signedByAll = false
                    }
                    var signataires = signature[1]
                    // both work, don't know the best one
                    /*signataires.forEach(function(signataire, index) {
                        sign.getEmail.call(signataire).then(function(email) {
                            sign.docSignedby.call(num, signataire).then(function(value) {
                                doc.signataires.push({
                                    address: signataire,
                                    email: email,
                                    sign: value,
                                })
                                if(index == signataires.length - 1)
                                {
                                    cb(doc)
                                }
                            })
                        })
                    })*/
                    /*
                    for (let i = 0; i < signataires.length; i++) {
                        sign.getEmail.call(signataires[i]).then(function(email) {
                            sign.docSignedby.call(num, signataires[i]).then(function(value) {

                                doc.signataires.push({
                                    address: signataires[i],
                                    email: email,
                                    sign: value,
                                })
                                if(i == signataires.length - 1)
                                {
                                    cb(doc)
                                }
                            })
                        })
                    }
                    */
                    for (let i = 0; i < signataires.length; i++) {
                        sign.getEmail.call(signataires[i]).then(function(email) {
                            sign.docSignedby.call(num, signataires[i]).then(function(value) {
                                doc.signataires.push({
                                    address: signataires[i],
                                    email: email,
                                    sign: value,
                                })
                                if(i == signataires.length - 1)
                                {
                                    cb(doc)
                                }
                            })
                        })
                    }
                })
            })
        },
        sendFileToServer: function(hash, file, emails, subject) {
          var listeEmails = ''
          console.log(emails);
          for (var i = 0; i < emails.length; i++) {
            if(i != 0) listeEmails += ','
            listeEmails += emails[i]
            console.log(listeEmails);
          }
          console.log(file)
          $http({
            method: 'POST',
            url: 'http://blockchain.maltem.com:8083/upload',
            headers: {
              'Content-Type': undefined
            },
            data: {
              name: hash,
              file: file,
              type: file.type,
              emails: listeEmails,
              subject: subject
            },
            transformRequest: function (data, headersGetter) {
              var formData = new FormData();
              angular.forEach(data, function (value, key) {
                formData.append(key, value);
              })
              return formData;
            }
          })
          .success(function (data) {
          })
          .error(function (data, status) {
          })
        },


        sendAlertToServer: function(idDoc) {
            var listeEmails = ''
            $rootScope.OpenSignature.deployed().then(function(sign) {
                _factory.documentStatus(idDoc, function(document) {
                    for (var i = 0; i < document.signataires.length; i++) {
                        if(i != 0) listeEmails += ','
                        listeEmails += document.signataires[i].email
                    }
                    console.log(listeEmails);
                    $http({
                      method: 'POST',
                      url: 'http://blockchain.maltem.com:8083/signedByAll',
                      headers: {
                        'Content-Type': undefined
                      },
                      data: {
                        idDoc: idDoc,
                        emails: listeEmails,
                        subject: subject

                      },
                      transformRequest: function (data, headersGetter) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                          formData.append(key, value);
                        })
                        return formData;
                      }
                    })
                    .success(function (data) {
                    })
                    .error(function (data, status) {
                    })
                })
            })
        },
        getEmailsOfDoc: function(idDoc, cb) {
            var emails = []
            $rootScope.OpenSignature.deployed().then(function(sign) {
                console.log('1');
                sign.getSignatairesSignature(idDoc).then(function(tabAddress) {
                    console.log(tabAddress);
                    for (let i = 0; i < tabAddress.length; i++) {
                        sign.getEmail(tabAddress[i]).then(function(email) {
                            emails.push(email)
                            if(i == tabAddress.length - 1)
                            {
                              console.log(emails);
                              cb(emails)
                            }
                        })
                    }
                })
            })

        },
        sendAlertToServer2: function(emails, subject, idDoc) {
            var listeEmails = ''
            $rootScope.OpenSignature.deployed().then(function(sign) {
                for (var i = 0; i < emails.length; i++) {
                    if(i != 0) listeEmails += ','
                    listeEmails += emails[i]
                }
                console.log(listeEmails);
                $http({
                  method: 'POST',
                  url: 'http://blockchain.maltem.com:8083/alert',
                  headers: {
                    'Content-Type': undefined
                  },
                  data: {
                    idDoc: idDoc,
                    emails: listeEmails,
                    subject: subject
                  },
                  transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                      formData.append(key, value);
                    })
                    return formData;
                  }
                })
                .success(function (data) {
                })
                .error(function (data, status) {
                })
            })
        },
/*

          var listeEmails = ''
          console.log(emails);

          console.log(file)
          $http({
            method: 'POST',
            url: 'http://localhost:3000/upload',
            headers: {
              'Content-Type': undefined
            },
            data: {
              name: hash,
              file: file,
              type: file.type,
              emails: listeEmails,
              subject: subject
            },
            transformRequest: function (data, headersGetter) {
              var formData = new FormData();
              angular.forEach(data, function (value, key) {
                formData.append(key, value);
              })
              return formData;
            }
          })
          .success(function (data) {
          })
          .error(function (data, status) {
          })
        },

*/
        getFileFromServer: function(hash) {
          var url = 'http://blockchain.maltem.com:8083/get_' + hash
          $http({
            method: 'GET',
            url: url,
          })
          .success(function (data, status, headers, config) {
            //console.log(data);
            $window.open(data)
          })
          .error(function (data, status) {
          })
        }
    }




    return _factory;
});
