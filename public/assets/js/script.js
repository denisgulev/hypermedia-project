$(document).ready(function() {
    console.log("READY");

    Sorter();

    showServicesInLocation();

    showVolunteerInfo();

    showContacts();

});

function Sorter() {

    $('input:radio[value =1]').click(function(){
 
        $('#subs li').slideUp('slow');
        $('#newContent').slideDown('slow');
        OldContent();
    });
 
    $('input:radio[value=2]').click(function() {
 
        $('#subs li').slideDown('slow');
        $('#newContent').slideUp('slow');
       
        ShowContent();
 
        $('#subs1 h3, #subs1 li').slideDown('slow');
    });
 
    $('#subs').find('input').click(function() {
        var inputId = $(this).attr('id');
        console.log(inputId);
        HideContent();
        $('#subs1 h3.loc' + inputId + ', li.loc' + inputId).slideDown('slow');
    });
 } 

function ShowContent() {

    $('#subs1').slideDown('slow');

}

function HideContent() {

    $('#subs1 h3, #subs1 li').slideUp('slow');

}

function OldContent() {

    $('#subs1').slideUp('slow');

}

function showServicesInLocation() {
    $('.fa-angle-double-down').click(function() {
        $('#services').slideToggle('slow');
    });
}

function showVolunteerInfo() {

    $('.fa-arrow-circle-down').eq(0).click(function() {
       $('p').eq(0).slideToggle('slow'); 
    });

    $('.fa-arrow-circle-down').eq(1).click(function() {
        $('p').eq(1).slideToggle('slow'); 
    });

    $('.fa-arrow-circle-down').eq(2).click(function() {
        $('p').eq(2).slideToggle('slow'); 
    });

    $('.fa-arrow-circle-down').eq(3).click(function() {
        $('p').eq(3).slideToggle('slow'); 
    });

    $('.fa-arrow-circle-down').eq(4).click(function() {
        $('p').eq(4).slideToggle('slow'); 
    });

    $('.fa-arrow-circle-down').eq(5).click(function() {
        $('p').eq(5).slideToggle('slow'); 
    });

    $('.fa-arrow-circle-down').eq(6).click(function() {
        $('p').eq(6).slideToggle('slow'); 
    });

    $('.fa-arrow-circle-down').eq(7).click(function() {
        $('p').eq(7).slideToggle('slow'); 
    });
}

function showContacts() {
    $('.fa-angle-double-down').click(function() {
        $('.contact').slideToggle('slow');
    });
}