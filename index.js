const bs4ModalMvc = {
    showActionModal(options)  {

        //options = {
        //    title: "Delete",
        //    html: "Are you sure want to delete this record?",
        //    actionLinkText: "Delete",
        //    actionLinkIcon: "fa fa-trash",
        //    actionLinkColor: "danger",
        //    actionLinkUrl: "/Admin/delete/123"
        //};
    
        var modal = $(`<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${options.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${options.html}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm smaller" data-dismiss="modal"><i class="fa fa-times mr-2"></i>Kapat</button>
                        <a href="${options.actionLinkUrl}" class="btn btn-${options.actionLinkColor} btn-sm smaller"><i class="${options.actionLinkIcon} mr-2"></i>${options.actionLinkText}</a>
                    </div>
                </div>
            </div>
        </div>`);
    
        modal.on('hidden.bs.modal', function (e) {
            modal.modal("dispose");
        });
    
        modal.modal("show");
    },
    
    showInfoModal(options) {
    
        //options = {
        //    title: "Delete",
        //    ajaxUrl: "/Admin/delete/123"
        //};
    
        var modal = $(`<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${options.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center my-5"><i class="fa fa-refresh fa-spin mr-2"></i> Lütfen bekleyiniz..</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm smaller" data-dismiss="modal">Kapat</button>
                    </div>
                </div>
            </div>
        </div>`);
    
        $(modal).find(".modal-body").load(options.ajaxUrl);
    
        modal.on('hidden.bs.modal', function (e) {
            modal.modal("dispose");
        });
    
        modal.modal("show");
    },
    
    showPostbackModal(options) {
        //var options = {
        //    title: "title",
        //    ajaxUrl: "/Home/Create",
        //    submitButtonText: "Save",
        //    submitButtonIcon: "fa fa-save",
        //    submitButtonColor: "success",
        //};
    
        var modal = $(`
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${options.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center my-5"><i class="fa fa-refresh fa-spin mr-2"></i> Lütfen bekleyiniz..</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm smaller" data-dismiss="modal"><i class="fa fa-times mr-2"></i>Kapat</button>
                        <button type="button" class="btn btn-${options.submitButtonColor} btn-sm smaller" data-submit-button><i class="${options.submitButtonIcon} mr-2"></i>${options.submitButtonText}</button>
                    </div>
                </div>
            </div>
        </div>`);
    
        modal.find(".modal-body").load(options.ajaxUrl, function () {
            setAjaxSubmit($(this), function () {    // set formNullCallback func
                modal.find("[data-submit-button]").attr("disabled", "disabled");
            });
    
            modal.find("[data-submit-button]").click(function () {
                modal.find('.modal-body form').submit();
            });
        });
    
    
        modal.on('hidden.bs.modal', function (e) {
            modal.modal("dispose");
        });
    
        modal.modal("show");
    
    },
    
    setAjaxSubmit(target, formNullCallback) {
        var form = target.find("form");
    
        if (form.length === 0) {
            if (typeof formNullCallback == "function")
                formNullCallback();
    
            return;
        }
    
        form.on('submit', function (e) {
            e.preventDefault();
    
            $(this).ajaxSubmit({
                target: target
            });
    
            var xhr = form.data('jqxhr');
    
            xhr.done(function () {
                setAjaxSubmit(target, formNullCallback);
            });
        });
    },
    
    handleDataModalDetail() {
        $("[data-modal-detail]").click(function () {
            showInfoModal({
                title: $(this).data("title"),
                ajaxUrl: $(this).data("ajax-url"),
            });
        });
    },
    
    handleDataModalDelete() {
        $("[data-modal-delete]").click(function () {
            showActionModal({
                title: $(this).data("title"),
                html: $(this).data("text"),
                actionLinkText: "Sil",
                actionLinkIcon: "fa fa-trash",
                actionLinkColor: "danger",
                actionLinkUrl: $(this).data("redirect-url"),
            });
        });
    },
    
    handleDataModalCreate() {
        $("[data-modal-create]").click(function () {
    
            var options = {
                title: $(this).data("title"),
                ajaxUrl: $(this).data("ajax-url"),
                submitButtonText: "Kaydet",
                submitButtonIcon: "fa fa-save",
                submitButtonColor: "success",
            };
    
            showPostbackModal(options);
        });
    },
    
    handleDataModalEdit() {
        $("[data-modal-edit]").click(function () {
    
            var options = {
                title: $(this).data("title"),
                ajaxUrl: $(this).data("ajax-url"),
                submitButtonText: "Kaydet",
                submitButtonIcon: "fa fa-save",
                submitButtonColor: "success",
            };
    
            showPostbackModal(options);
        });
    },
    
    handleSearchForm() {
        if ($("[data-search-button]").length) {
            $("[data-search-button]").click(function () {
                var keyword = $("[data-search-input]").val();
                window.location = $(this).data("url") + "?search=" + keyword;
            });
        }
    }
}

export default bs4ModalMvc