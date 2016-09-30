
/*
Add lgh
*/
var addlgh = function () {
    var id = $("#userid").val();
    var name = $("#username").val();
    var pwd = $("#password").val();

    var divalert = $(".alert");

    $.ajax({
        url: '/api/Users',
        method: "POST",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ 'id': id, 'name': name, 'password': pwd })

    }).success(function () {
        $(".form-control").val("");
        divalert.html("<span class='glyphicon glyphicon-ok'></span>&nbsp;" + name + " skapades.");
        divalert.removeClass('alert-warning').addClass('alert-success').addClass('in');
        listlghs(true);

    }).error(function () {
        divalert.html("<span class='glyphicon glyphicon-exclamation-sign'></span>&nbsp;" + "Fel inträffade")
        divalert.removeClass('alert-success').addClass('alert-warning').addClass('in');

    });
};

/*
List lghs
*/
var listlghs = function (async) {
    var lghtbody = $("#tbl-lgh > tbody");
    $.ajax({
        url: "/api/users",
        method: "GET",
        contentType: 'application/json',
        dataType: 'json',
        async: async
    }).success(function (data) {
        lghtbody.empty();
        lghtbody.append(

            // with map you can translate object to an array...
            // http://api.jquery.com/jQuery.map/
            // ...join converts that array to a string
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
            // ---
            $.map(data, function (lgh, index) {
                return '<tr><td>' + lgh.Id + '</td><td>' + lgh.Name + '</td></tr>';
            }).join()
        );

    });

};

/*
jQuery doc ready
*/
$(document).ready(function () {

    listlghs(false);

    $("#btn-add-lgh").click(function (data) {
        addlgh();
    });

});