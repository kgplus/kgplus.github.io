(function($){'use strict';$(document).ready(function(){var jobpost_submit_button=$('.app-submit');$(".jobpost-form").on("submit",function(event){$('.sjb-loading').show();var jobpost_form_status=$('#jobpost_form_status');var datastring=new FormData(document.getElementById("sjb-application-form"));var is_valid_email=sjb_is_valid_input(event,"email","sjb-email-address");var is_valid_phone=sjb_is_valid_input(event,"phone","sjb-phone-number");var is_attachment=sjb_is_attachment(event);if(!is_valid_email||!is_valid_phone||!is_attachment){$('.sjb-loading').hide();return false;}
setTimeout(function(){$.ajax({url:application_form.ajaxurl,type:'POST',dataType:'json',data:datastring,async:false,cache:false,contentType:false,processData:false,beforeSend:function(){jobpost_submit_button.attr('disabled','diabled');},success:function(response){if(response['success']==true){$('.jobpost-form').slideUp();jobpost_form_status.html(response['success_alert']);}
if(response['success']==false){jobpost_form_status.html(response['error']+' '+application_form.jquery_alerts['application_not_submitted']+'</div>');$('.sjb-loading').hide();jobpost_submit_button.removeAttr('disabled');}}});},3000);return false;});$('.sjb-datepicker').datepicker({dateFormat:'dd-mm-yy',changeMonth:true,changeYear:true,yearRange:'-100:+50',});$('.sjb-email-address').on('input',function(){var input=$(this);var re=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;var is_email=re.test(input.val());var error_element=$(this).next();if(is_email){input.removeClass("invalid").addClass("valid");error_element.hide();}else{input.removeClass("valid").addClass("invalid");}});if($('.sjb-phone-number').length){var telInput_id=$('.sjb-phone-number').map(function(){return this.id;}).get();for(var input_ID in telInput_id){var telInput=$('#'+telInput_id[input_ID]);telInput.intlTelInput({initialCountry:"auto",geoIpLookup:function(callback){$.get('https://ipinfo.io',function(){},"jsonp").always(function(resp){var countryCode=(resp&&resp.country)?resp.country:"";callback(countryCode);});},});}}
$('.sjb-phone-number').on('input',function(){var telInput=$(this);var telInput_id=$(this).attr('id');var error_element=$("#"+telInput_id+"-invalid-phone");error_element.hide();if($.trim(telInput.val())){if(telInput.intlTelInput("isValidNumber")){telInput.removeClass("invalid").addClass("valid");error_element.hide();}else{telInput.removeClass("valid").addClass("invalid");}}});$('.sjb-attachment').on('change',function(){var input=$(this);var file=$("#"+$(this).attr("id"));var error_element=file.parent().next("span");error_element.text('');error_element.hide();if(0!=file.get(0).files.length){var file_ext=file.val().split('.').pop().toLowerCase();var allowed_file_exts=application_form.allowed_extensions;var settings_file_exts=application_form.setting_extensions;var selected_file_exts=(('yes'===application_form.all_extensions_check)||null==settings_file_exts)?allowed_file_exts:settings_file_exts;if($.inArray(file_ext,selected_file_exts)>-1){jobpost_submit_button.attr('disabled',false);input.removeClass("invalid").addClass("valid");}else{error_element.text(application_form.jquery_alerts['invalid_extension']);error_element.show();input.removeClass("valid").addClass("invalid");}}});function sjb_is_attachment(event){var error_free=true;$(".sjb-attachment").each(function(){var element=$("#"+$(this).attr("id"));var valid=element.hasClass("valid");var is_required_class=element.hasClass("sjb-not-required");if(!valid){if(!(is_required_class&&0===element.get(0).files.length)){error_free=false;}}
if(!error_free){event.preventDefault();}});return error_free;}
function sjb_is_valid_input(event,input_type,input_class){var jobpost_form_inputs=$("."+input_class).serializeArray();var error_free=true;for(var i in jobpost_form_inputs){var element=$("#"+jobpost_form_inputs[i]['name']);var valid=element.hasClass("valid");var is_required_class=element.hasClass("sjb-not-required");if(!(is_required_class&&""===jobpost_form_inputs[i]['value'])){if("email"===input_type){var error_element=$("span",element.parent());}else if("phone"===input_type){var error_element=$("#"+jobpost_form_inputs[i]['name']+"-invalid-phone");}
if(!valid){error_element.show();error_free=false;}
else{error_element.hide();}
if(!error_free){event.preventDefault();}}}
return error_free;}
var requiredCheckboxes=$(':checkbox[required]');requiredCheckboxes.on('change',function(){var checkboxGroup=requiredCheckboxes.filter('[name="'+$(this).attr('name')+'"]');var isChecked=checkboxGroup.is(':checked');checkboxGroup.prop('required',!isChecked);});$(".sjb-numbers-only").keypress(function(evt){evt=(evt)?evt:window.event;var charCode=(evt.which)?evt.which:evt.keyCode;if(charCode>31&&(charCode<48||charCode>57)){return false;}
return true;});});var file={maxlength:20,convert:function(){$('input[type=file].sjb-attachment').each(function(){$(this).wrap('<div class="file" />');$(this).parent().prepend('<div>'+application_form.file['browse']+'</div>');$(this).parent().prepend('<span>'+application_form.file['no_file_chosen']+'</span>');$(this).fadeTo(0,0);$(this).attr('size','50');});},update:function(x){var filename=x.val().replace(/^.*\\/g,'');if(filename.length>$(this).maxlength){trim_start=$(this).maxlength/2-1;trim_end=trim_start+filename.length-$(this).maxlength+1;filename=filename.substr(0,trim_start)+'&#8230;'+filename.substr(trim_end);}
if(filename=='')
filename=application_form.file['no_file_chosen'];x.siblings('span').html(filename);}}
$(document).ready(function(){file.convert();$('input[type=file].sjb-attachment').change(function(){file.update($(this));});});})(jQuery);