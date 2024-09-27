sap.ui.define([
    "sap/ui/core/Fragment",
], function(Fragment) {
    'use strict';
    return {
        sPath: "",

        onEdit: function(oEvent) {
            this._getSelectedRow();
            if(this._getModel("modelView").getProperty("/Usuario") != undefined ) this._getValueHelpRequest();
            //else    
        },

        _getModel: function(sModel){
            return this.getView().getModel(sModel);
        },

        _getSelectedRow: function(){
            this.sPath  = this.getView().byId("listReport").getTable().getSelectedContextPaths()[0];
            var sNome  = this._getModel().getProperty(this.sPath + "/Nome")

            this._getModel("modelView").setProperty("/Nome", sNome )
            this._getModel("modelView").setProperty("/Status" ,  this._getModel().getProperty(this.sPath + "/Status" ) )
            this._getModel("modelView").setProperty("/Usuario",  this._getModel().getProperty(this.sPath + "/Usuario") )
            this._getModel("modelView").setProperty("/Genero",    this._getModel().getProperty(this.sPath + "/Genero") )
            this._getModel("modelView").setProperty("/Datalock",  this._getModel().getProperty(this.sPath + "/Datalock") )
            this._getModel("modelView").setProperty("/Datareturn",this._getModel().getProperty(this.sPath + "/Datareturn") )
        },

        _getValueHelpRequest: function(){
            var oView = this.getView();

            if(!this._pValueHelpDialog) {
                this._pValueHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "projeto.sap.projetolock.fragment.DialogEdit",
                    controller: this
                }).then(function(oValueHelpDialog){
                    oView.addDependent(oValueHelpDialog);
                    return oValueHelpDialog;
                })
            }
            this._pValueHelpDialog.then(function(oValueHelpDialog){
                oValueHelpDialog.open();
            }.bind(this));
        },
        
        onSave: function(){
            var sStatus      = this._getModel("modelView").getProperty("/Status");
            var sData        = this._getModel("modelView").getProperty("/Datalock");
            var sDataRetorno = this._getModel("modelView").getProperty("/Datareturn");

            this._getModel().setProperty(this.sPath + "/Status", sStatus)
            this._getModel().setProperty(this.sPath + "/Datalock", sData)
            this._getModel().setProperty(this.sPath + "/Datareturn", sDataRetorno)

            this._getModel().submitChanges();
            this._getModel().refresh();

            this.onClose();
        },

        onClose: function(){
            this.oDialog = this.getView().byId("ListDialog");
            this.oDialog.close();
        }
    };
});