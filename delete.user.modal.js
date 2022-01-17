class DeleteUserModal {
    get deleteBtn() {return $('#dialogDeleteBtn'); }
    get cancelBtn() {return $("#deleteConfModal div.modal-footer input[value='Cancel']"); }

    async confirmDelete() { await this.deleteBtn.click(); }
}

module.exports = new DeleteUserModal();