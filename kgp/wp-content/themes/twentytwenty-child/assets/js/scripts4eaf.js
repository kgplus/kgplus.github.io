window.selected_property_flag = 0;
jQuery(function($) {
  $('.modal').on('hidden.bs.modal', function(){
		var id = $(this).find('div.modal-body div.gform_anchor').attr('id');
		$(this).find('div.modal-body').html(formHtml[id]);
    gfromFilterSpecialCharacters();
	});

  $('.modal').on('shown.bs.modal', function(){
    gfromFilterSpecialCharacters();
		//Clone form for reload after submit
    var id = $(this).find('div.modal-body div.gform_anchor').attr('id');
    if(formHtml[id] == undefined)
    {
        formHtml[id]= $(this).find('div.modal-body div.gform_anchor').closest('div.modal-body').html();	
    }
	});
  // Community menu
  var checkMobile = window.matchMedia("(max-width: 767px)");
  var checkMobileTablet = window.matchMedia("(max-width: 991px)");
  var w = $(document).width();
  var h = $(document).height();
  $(".communities-menu").css('width',w);
  $(".communities-menu").css('height',h);

  $('.communities-tab').click(function(){

    $('.communities-menu').width( $(window).width() );
    $('.communities-menu').height( $(window).height() );
    //$('.communities-menu').css( {'overflow':'auto'} );
    $("body").toggleClass("body-fixed-position");

    $('.communities-menu').slideToggle();
    $('.communities-tab').toggleClass('active');
    event.stopPropagation();
    return false;
  });

  $(document).click(function(e) {
    if ($(e.target).is(".communities-featured-container") === false) {
      $("body").removeClass("body-fixed-position");
      $('.communities-tab').removeClass('active');
    }
  });

  $('.share-btn').click(function(){

    $('.sharing-options').slideToggle();
    $('.share-btn').toggleClass('active');
    event.stopPropagation();
    return false;

  });

/* Accept Cookie Button */
$('.cookie-disclaimer .btn-accept').on('click', function () {
  $('.cookie-disclaimer').hide();
  // setCookie('cookieconsent','dismissed',365);
});


$('.home-search-component input[name="p-type[]"').on('change', function () {
	//clear all enaable disable function
	checkAllSearchFilters();
    var checkedBoxes = $('input[name="p-type[]"]:checked').length;
    var selected_msg_label = "";
    var sel_property = [];
		
    $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
    $('input[name="p-type[]"]:checked').each(function () {
	  sel_property.push(this.value);
    });

    if (sel_property.length != 0) {
      var CommByTpe = getCommByType(sel_property);
      /* make width of the main community list full width */
      $('.primary-communitylist-container').addClass('property-community-list');
      if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + property_type_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + properties_type_text;
      }
      $('.property-type-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
	  $('#clear-all-fields').addClass('active-clearall');
    } else {
      $('.community-options-desktop').html(CommunityDDBeforeAJax);
      $('.property-type-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      $('.primary-communitylist-container').removeClass('property-community-list');
      return;
    }

    if (!CommunityDDBeforeAJax) {
      CommunityDDBeforeAJax = $('.community-options-desktop').html();
    }
		
  });
  
  /*  Function To Hide floors */
  $('input[name="p-type[]"').on('change', function () {
	  
	 var selected_msg_label = "";  
	 var checkedBoxes = $('input[name="p-type[]"]:checked').length;
	 if (checkedBoxes > 0){
	 if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + property_type_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + properties_type_text;
      }
      $('.property-type-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
	  $('#property-for-mobile .search-val').addClass('selected-val').text(selected_msg_label);
	  $('#clear-all-fields').addClass('active-clearall');
    } else {
      $('.property-type-selection').find('span.search-val').removeClass('selected-val').text(any_text);
	  $('#property-for-mobile .search-val').removeClass('selected-val').text(any_text);
    }
	
	 //console.log("checkedBoxes-"+checkedBoxes);
	 if(checkedBoxes == 0 || checkedBoxes > 3) {
		selected_property_flag = 0;
		//console.log("ZERO"+selected_property_flag);		
	}
	else {
		if (checkedBoxes >= 1 && checkedBoxes <= 3) {
			$('input[name="p-type[]"]:checked').each(function () {
				//console.log(this.value);
				if(this.value != "Villa" && this.value != "Townhouse" && this.value != "Plot" )
				{
					selected_property_flag = 0;
					//console.log(selected_property_flag+"FLAG is ZERO now");	
					return false;				
				}
				else{
					if(this.value == "Villa" || this.value == "Townhouse" || this.value == "Plot" )
					{
						selected_property_flag = 1;
						//console.log(selected_property_flag+"FLAG IS ONE now");
					}
				}			
			});
		}		
	}
	//console.log("OUtside loop FLAG"+ selected_property_flag);
	if(selected_property_flag){
		if(checkMobile.matches){
			$('#floor-for-mobile').addClass("d-none"); 
			}
		else{
			$('.floor-selection').addClass("d-none");   
		    }
	}
	else
		{
			if(checkMobile.matches){
				$('#floor-for-mobile').removeClass("d-none"); 
			}
			else{
				$('.floor-selection').removeClass("d-none"); 
			}
				 
		}			
  });
  /* END  Hide floors */
  
  function checkAllSearchFilters() {
  if ( $('input[name="comm[]"]:checked').length == 0 && $('input[name="bed[]"]:checked').length == 0 && 
       $('input[name="p-type[]"]:checked').length == 0 && 
       $('select[name="max-price"]').val() == 100000000 && $('select[name="min-price"]').val() == 0 && 
       $('select[name="max-floor"]').val() == 0 && $('select[name="min-floor"]').val() == 0 &&
       $('select[name="max-area"]').val() == 0 && $('select[name="min-area"]').val() == 0 )
    {
      $('#clear-all-fields').removeClass('active-clearall');
    }
  }


  $('#propertyTypeModal').on('hidden.bs.modal', function () {
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
  });

  $('#communityModal').on('hidden.bs.modal', function () {
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
  });

  $('#priceModal').on('hidden.bs.modal', function () {
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
  });

  $('#bedroomsModal').on('hidden.bs.modal', function () {
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
  });

  /* */

  /* This section for max price to change onclick min price which does not work on Safari */
  $.fn.showOption = function () {
    this.each(function () {
      if (this.tagName == "OPTION") {
        var opt = this;
        if ($(this).parent().get(0).tagName == "SPAN") {
          var span = $(this).parent().get(0);
          $(span).replaceWith(opt);
          $(span).remove();
        }
        opt.disabled = false;
        $(opt).show();
      }
    });
    return this;
  }
  $.fn.hideOption = function () {
    this.each(function () {
      if (this.tagName == "OPTION") {
        var opt = this;
        if ($(this).parent().get(0).tagName == "SPAN") {
          var span = $(this).parent().get(0);
          $(span).hide();
        } else {
          $(opt).wrap("span").hide();
        }
        opt.disabled = true;
      }
    });
    return this;
  }
  /* End this section */  
  
  $(document.body).on("click", function (event) {
    var el = event.srcElement;
    if (!$(el).hasClass("trigger") && (!$(el).is("a")))
      $(".communities-menu").slideUp();
  });

  $(document.body).on("click", function (event) {
    var el = event.srcElement;
    if (!$(el).hasClass("trigger") && (!$(el).is("a")))
      $(".sharing-options").slideUp();
  });

  $(document).mouseup(function (e) {
    var search_form = $(".prop-search-bar");
    var mobile_search_form = $(".homepage-mobile-filter-section");
    // If the target of the click isn't the container  
    if (!search_form.is(e.target) && search_form.has(e.target).length === 0) {
      //alert('Clicked outside');
      if (!checkMobile.matches) {
        if ($(".price-range-selection .select-sec-options").is(":visible")) {
          $('.price-range-selection .select-sec-options').slideUp();
          $('.price-range-selection label.search-fld').removeClass("active");
          $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
        if ($(".property-type-selection .select-sec-options").is(":visible")) {
          $('.property-type-selection .select-sec-options').slideUp();
          $('.property-type-selection label.search-fld').removeClass("active");
          $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
        if ($(".bedroom-selection .select-sec-options").is(":visible")) {
          $('.bedroom-selection .select-sec-options').slideUp();
          $('.bedroom-selection label.search-fld').removeClass("active");
          $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
		if ($(".floor-selection .select-sec-options").is(":visible")) {
          $('.floor-selection .select-sec-options').slideUp();
          $('.floor-selection label.search-fld').removeClass("active");
          $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
		if ($(".area-selection .select-sec-options").is(":visible")) {
          $('.area-selection .select-sec-options').slideUp();
          $('.area-selection label.search-fld').removeClass("active");
          $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
		if ($(".property-selection .select-sec-options").is(":visible")) {
          $('.property-selection .select-sec-options').slideUp();
          $('.property-selection label.search-fld').removeClass("active");
          $('.property-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
        if ($('.community-options').is(":visible")) {
          $('.community-options').slideUp();
          $('.community-selection label.search-fld').toggleClass('active');
          $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
      }
    }
    if (!mobile_search_form.is(e.target) && mobile_search_form.has(e.target).length === 0) {
      $(".homepage-mobile-filter-section #prop_search_mobile_form").hide();
      $(".home-hero-section .prop-search-bar").removeClass('position-property-search');
      $(".hero-background-overlay").removeClass('set-hero-overlay');
      $("#btn-show-filters").show();
    }
  });


  $(document).ready(function () {

	/*
		Custom select picker on search property page
	*/
	if( $('.emr-custom-select').length ){
		$('.emr-custom-select').selectpicker();
				
	}
	
    /*
    adjust css for header, hide the CTA 
    */
    if ($('.phone-tab').length <= 0 && $('.watsapp-tab').length <= 0 && $('.register-tab').length <= 0) {
      $("ul li.lang-tab").addClass("mr-5");
    } else {
      $("ul li.lang-tab").removeClass("mr-5");
    }
    if ($('.home-search-component').length > 0) {
      $('.home-search-component input[name="comm[]"]:checkbox').prop('checked', false);
      $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
      $('.home-search-component input[name="bed[]"]:checkbox').prop('checked', false);
      $('.bedroom-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      $('.home-search-component select[name="min-price"] option[value="0"]').prop("selected", true);
      $('.home-search-component select[name="max-price"] option[value="100000000"]').prop("selected", true);
      $('.home-search-component .price-range-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      $('.home-search-component input[name="p-type[]"]:checkbox').prop('checked', false);
      $('.property-selection').find('span.search-val').removeClass('selected-val').text(any_text);
    }

    if (!checkMobileTablet.matches) {
      /* Sticky Fixed on scroll left remove sticky before footer */
      $(window).scroll(function () {

        if ($(window).scrollTop() > 100) {
          $('.cookie-disclaimer').addClass('stick-top');
        } else if ($(window).scrollTop() <= 100) {
          $('.cookie-disclaimer').removeClass('stick-top');
        }

        if ($('#myElementToStick').length && $('#myElementToStick').offset().top + $("#myElementToStick").height() > $("#colophon").offset().top) {
          $('#myElementToStick').css('top', -($("#myElementToStick").offset().top + $("#myElementToStick").height() - $("#colophon").offset().top));
        }
      });

    }

    if(device != "desktop" || device_tablet || window.innerWidth < 991)
		{
      setTimeout(function(){
        // MMenu for mobile
  		  const menu = new Mmenu( document.querySelector( '#mobile_nav' ),
  			{
  			  navbars : [
  				{
  				  content   : [ 'close' ]
  				},{
  				  content   : [ 'prev' ]
  				},
  			  ]
  			}
  		  );
  		$("#mobile_nav").find( ".mm-navbar__btn.mm-btn_prev" ).append( "Back to Menu" );  
  		const api = menu.API;
  		  api.bind( "close:after", function() {
  			  api.closeAllPanels();
  		});

      $('.get-touch-btn').click(function( ev ) {
        ev.preventDefault();
        if ($("#mobile_nav").hasClass( "mm-menu_opened" )){
          api.close();
        } 
      });
      console.log('Mmenu Loaded');
      }, 800);	
  }

	/* Mobile Filter -Sticky */
	$(window).scroll(function() {
	  var distanceFromTop = $(document).scrollTop();
	  if (distanceFromTop >= 200)
	  {
		  $('.prop-search-mobile-form').addClass('search-sticky');
		  if($('.prop-search-mobile-form').hasClass('search-sticky') && $('#collapseFilter').hasClass('show')){
			  $('body').css('overflow','hidden');
		  }
	  }
	  else
	  {
		  $('.prop-search-mobile-form').removeClass('search-sticky');
	  }
	});
	
	$("#collapseFilter").on('shown.bs.collapse', function(){
		if($('.prop-search-mobile-form').hasClass('search-sticky')){
			$('body').css('overflow','hidden');
		}
	});
	
	$("#collapseFilter").on('hide.bs.collapse', function(){
		$('body').css('overflow','scroll');
	});
  
    /* Initialize animation on scroll */
    //AOS.init();

    /* Remove scroll staggered animation from featured community menu */
    $(".communities-menu-featured .communities-featured-block").removeClass("come-in");

    var min_price_selection;
    var currentItem;
    var itemsFound;
    var min_price_selection;
    var max_price_selection;
    //$('.price-validation-error').hide();

    //$('#select').append($('<option>', {value:1, text:'One'}));
	
	//alert($('select[name="max-price"]').val());
	//alert($('select[name="min-price"]').val());
	if(checkMobile.matches){
		$('#floor-for-mobile').removeClass("d-none"); 
	}
	else{
		$('.floor-selection').removeClass("d-none"); 
	}
    if ($('select[name="max-price"]').val()==0){
		$('select[name="max-price"] option[value="100000000"]').prop("selected", true);
	}
	if ($('select[name="max-area"]').val()==0){
		$('select[name="max-area"] option[value="50000"]').prop("selected", true);
	}
    if ($('input[name="comm[]"]:checked').length > 0) {
      $('.community-selection').find('span.search-val').addClass('selected-val');
      $('#clear-community').addClass('active-clear');
      $('#community-for-mobile').find('span.search-val').addClass('selected-val');
      $('#mobile-clear-community').addClass('active-clear');
	  $('#clear-all-fields').addClass('active-clearall');
    }
    if ($('input[name="bed[]"]:checked').length > 0) {
      $('.bedroom-selection').find('span.search-val').addClass('selected-val');
      $('#clear-bedrooms').addClass('active-clear');
      $('#bedroom-for-mobile').find('span.search-val').addClass('selected-val');
      $('#mobile-clear-bedrooms').addClass('active-clear');
	  $('#clear-all-fields').addClass('active-clearall');
    }
    if ($('select[name="max-price"]').val() > 0) {
		if ($('select[name="max-price"]').val() == 100000000 & $('select[name="min-price"]').val() == 0) {
        //$('.price-range-selection').find('span.search-val').removeClass('selected-val');
      } 
	  else if($('select[name="max-price"]').val() == 20000000 & $('select[name="min-price"]').val() == 0){
		$('.price-range-selection').find('span.search-val').removeClass('selected-val');  
	  }
	  else {
        if ($('select[name="min-price"]').val() > 0 || $('select[name="max-price"]').val() > 0) {
          $('.price-range-selection').find('span.search-val').addClass('selected-val');
          $('#clear-price').addClass('active-clear');
          $('#mobile-clear-price').addClass('active-clear');
          $('#price-for-mobile').find('span.search-val').addClass('selected-val');
		  $('#clear-all-fields').addClass('active-clearall');
		  //console.log("HHHHHHHHH#");
        }
      }
    }
	if ($('select[name="floor"]').val() >= 1 ){
     $('.floor-selection').find('span.search-val').addClass('selected-val');
     //$('#clear-price').addClass('active-clear');
     $('#clear-floor').addClass('active-clear');
     $('#floor-for-mobile').find('span.search-val').addClass('selected-val');
	 $('#clear-all-fields').addClass('active-clearall'); 
     //console.log("HHHHHHHHH#");	 
    }
	
	if ($('select[name="min-area"]').val() > 500){
     //$('.price-range-selection').find('span.search-val').addClass('selected-val');
     //$('#clear-price').addClass('active-clear');
     $('#clear-area').addClass('active-clear');
     $('#area-for-mobile').find('span.search-val').addClass('selected-val');
	 $('#clear-all-fields').addClass('active-clearall'); 
     //console.log("HHHHHHHHH#");	 
    }
	
    if ($('input[name="p-type[]"]:checked').length > 0) {
	  var selectedPropTypes = [];
      $('.property-type-selection').find('span.search-val').addClass('selected-val');
      $('#clear-property').addClass('active-clear');
      $('#property-for-mobile').find('span.search-val').addClass('selected-val');
      $('#mobile-clear-property').addClass('active-clear');
	  $('#clear-all-fields').addClass('active-clearall');
	  
	  // - Hide Floor if its ***
	  var sel_property = [];
	  $('input[name="p-type[]"]:checked').each(function () {
		sel_property.push(this.value);
	  });
	  //console.log("length of property type selection"+sel_property.length);
	  if (sel_property.length <= 3) {
		  //console.log("I am less than equal to 2 !")
		$('input[name="p-type[]"]:checked').each(function () {
			if(this.value != "Villa" && this.value != "Townhouse" && this.value != "Plot" )
			{
				selected_property_flag = 0;
				//console.log(selected_property_flag+"FLAG is ZERO now");	
				return false;
			}
			else{
				if(this.value == "Villa" || this.value == "Townhouse" || this.value == "Plot" )
				{
					selected_property_flag = 1;
					//console.log(selected_property_flag+"FLAG IS ONE now");
				}
			}
		});
	}
	//console.log("OUtside loop FLAG"+ selected_property_flag);
	if(selected_property_flag){
		if(checkMobile.matches){
			$('#floor-for-mobile').addClass("d-none"); 
			}
		else{
			$('.floor-selection').addClass("d-none");   
		    }
	}
	else
		{
			if(checkMobile.matches){
				$('#floor-for-mobile').removeClass("d-none"); 
			}
			else{
				$('.floor-selection').removeClass("d-none"); 
			}
				 
		}
    }

    // ############################ Enable and disable Clear button  ##############################
    $('input[name="comm[]"').on('change', function () {
	   //clear all enaable disable function
	   checkAllSearchFilters();
      ////console.log($('#prop_search_form input[name="comm[]"]:checked').length);
      if (checkMobileTablet.matches) {
        //console.log('checkMobile.matches ==============>' + checkMobile.matches);
        //console.log($('#prop_search_mobile_form input[name="comm[]"]:checked').length);
        if ($('input[name="comm[]"]:checked').length < 1) {
          $('#mobile-clear-community').removeClass('active-clear');
        } else {
          $('#mobile-clear-community').addClass('active-clear');
        }
      } else {
        if ($('#prop_search_form input[name="comm[]"]:checked').length < 1) {
          ////console.log($('#prop_search_form input[name="comm[]"]:checked').length);
          $('#clear-community').removeClass('active-clear');
        } else {
          $('#clear-community').addClass('active-clear');
        }
      }
    });
    $('input[name="bed[]"').on('change', function () {
	  //clear all enaable disable function
	  checkAllSearchFilters();
      if (checkMobileTablet.matches) {
        if ($('input[name="bed[]"]:checked').length < 1) {
          $('#mobile-clear-bedrooms').removeClass('active-clear');
        } else {
          $('#mobile-clear-bedrooms').addClass('active-clear');
        }
      } else {
        if ($('#prop_search_form input[name="bed[]"]:checked').length < 1) {
          $('#clear-bedrooms').removeClass('active-clear');
        } else {
          $('#clear-bedrooms').addClass('active-clear');
        }
      }
    });
    $('input[name="p-type[]"').on('change', '', function () {
	  //clear all enaable disable function
	  checkAllSearchFilters();
      if (checkMobileTablet.matches) {
        if ($('input[name="p-type[]"]:checked').length < 1) {
          $('#mobile-clear-property').removeClass('active-clear');
        } else {
          $('#mobile-clear-property').addClass('active-clear');
        }
      } else {
        if ($('#prop_search_form input[name="p-type[]"]:checked').length < 1) {
          $('#clear-property').removeClass('active-clear');
        } else {
          $('#clear-property').addClass('active-clear');
        }
      }
    });

    $('select[name="min-price"]').on('change', function () {
	   //clear all enaable disable function
	   checkAllSearchFilters();
      //console.log('++++++++++++Changing Min Price');
      if ($(this).val() > 0) {
        $('#clear-price').addClass('active-clear');
        $('#mobile-clear-price').addClass('active-clear');
      } else {
        $('#clear-price').removeClass('active-clear');
        $('#mobile-clear-price').removeClass('active-clear');
      }
      /* Onchange of min-price populate max price from min price onwards */
      min_price_selection = parseInt($(this).children("option:selected").val());
      ////console.log(min_price_selection);
      $('select[name="max-price"] option').each(function () {
        $(this).showOption();
        currentItem = parseInt($(this).val());
        ////Console.log(currentItem);
        if (currentItem < min_price_selection) {
          $(this).hideOption();
        }

      });

    });
    /* END Onchange of min-price populate max price from min price onwards */
    $('select[name="max-price"]').on('change', function () {
	  //clear all enaable disable function
	  checkAllSearchFilters();
      //console.log('++++++++++++Changing Max Price');
      if ($(this).val() > 0) {
        $('#clear-price').addClass('active-clear');
        $('#mobile-clear-price').addClass('active-clear');
      } else {
        $('#clear-price').removeClass('active-clear');
        $('#mobile-clear-price').removeClass('active-clear');
      }
      /* Onchange of min-price populate max price from min price onwards */
      max_price_selection = parseInt($(this).children("option:selected").val());
      ////console.log(max_price_selection);
      $('select[name="min-price"] option').each(function () {
        $(this).showOption();
        currentItem = parseInt($(this).val());
        ////console.log(currentItem);
        if (currentItem > max_price_selection) {
          $(this).hideOption();
        }

      });
      /* END Onchange of min-price populate max price from min price onwards */
    });
	
	
	$('input[name="prop[]"').on('change', function () {
      checkAllSearchFilters();
      if ($('input[name="prop[]"]:checked').length < 1) {
      $('#clear-comm-property').removeClass('active-clear');
     } else {
        $('#clear-comm-property').addClass('active-clear');
      }

    var checkedBoxes = $('input[name="prop[]"]:checked').length;
    //alert(checkedBoxes);
    var selected_msg_label = "";
    if (checkedBoxes > 0) {
      if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + property_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + properties_text;
      }
      $('.property-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
	  $('#property-comm-for-mobile span.search-val').addClass('selected-val').text(selected_msg_label);
    $('#clear-all-fields').addClass('active-clearall');
    } else {
      $('.property-selection').find('span.search-val').removeClass('selected-val').text(all_properties_text);
	  $('#property-comm-for-mobile span.search-val').removeClass('selected-val').text(all_properties_text);
    }

    });
	
    // ########## END Enable and disable Clear button
    if (typeof lazyload === 'function'){      
      setTimeout(function(){ lazyload(); }, 250);
    }
  });

  var pid = "";
  var desktop_screen_size = window.matchMedia("(min-width: 1025px)");
  var screen_size = window.matchMedia("(max-width: 1024px)");

  /* Search filter on click toggle */

  $('.community-selection label.search-fld').click(function () {
    pid = $(this).parent().attr("id");
    if (pid == "community-selection-wrapper") {
      if (!checkMobile.matches) {
        $('html, body').animate({
          scrollTop: 400
        }, 600);
      }
    }

    /* hide the other toggles */
    $('.price-range-selection .select-sec-options').slideUp(); //slideUp
    $('.price-range-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();
    $('.area-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".property-type-selection .select-sec-options").is(":visible")) {
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".floor-selection .select-sec-options").is(":visible")) {
      $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".area-selection .select-sec-options").is(":visible")) {
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    /* toggle the other icon */
    $('.community-options').slideToggle();
    $('.community-selection label.search-fld').toggleClass('active');
    $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;

  });

  $('.bedroom-selection label.search-fld').click(function () {
    pid = $(this).parent().attr("id");
    if (pid == "bedroom-selection-wrapper") {
      if (!checkMobile.matches) {
        $('html, body').animate({
          scrollTop: 400
        }, 600);
      }
    }

    /* hide the other toggles */
    $('.price-range-selection .select-sec-options').slideUp();
    $('.price-range-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $('.community-options').slideUp();
    $('.community-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();
    $('.area-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".property-type-selection .select-sec-options").is(":visible")) {
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".floor-selection .select-sec-options").is(":visible")) {
      $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".area-selection .select-sec-options").is(":visible")) {
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    /* toggle the other icon */
    $('.bedroom-selection .select-sec-options').slideToggle();
    $('.bedroom-selection label.search-fld').toggleClass('active');
    $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;
  });

  $('.price-range-selection label.search-fld').click(function () {
    pid = $(this).parent().attr("id");
    if (pid == "price-range-selection-wrapper") {
      if (!checkMobile.matches) {
        $('html, body').animate({
          scrollTop: 400
        }, 600);
      }
    }

    /****** hide the other toggles *********/
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $(".community-options").hide("fast");
    $('.community-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();
    $('.area-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".property-type-selection .select-sec-options").is(":visible")) {
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".floor-selection .select-sec-options").is(":visible")) {
      $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".area-selection .select-sec-options").is(":visible")) {
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    /* toggle the other icon */
    $('.price-range-selection .select-sec-options').slideToggle();
    $('.price-range-selection label.search-fld').toggleClass('active');
    $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;

  });

  $('.property-type-selection label.search-fld').click(function () {
    var pid = $(this).parent().attr("id");
    //console.log(pid);

    /* hide the other toggles */
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.price-range-selection .select-sec-options').slideUp();
    $('.price-range-selection label.search-fld').removeClass("active");
    $(".community-options").hide("fast");
    $('.community-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();
    $('.area-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".property-type-selection .select-sec-options").is(":visible")) {
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".floor-selection .select-sec-options").is(":visible")) {
      $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".area-selection .select-sec-options").is(":visible")) {
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    /* toggle the other icon */
    $('.property-type-selection .select-sec-options').slideToggle();
    $('.property-type-selection label.search-fld').toggleClass('active');
    $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;

  });

  $('.floor-selection label.search-fld').click(function () {
    var pid = $(this).parent().attr("id");
    //console.log(pid);

    /* hide the other toggles */
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.price-range-selection .select-sec-options').slideUp();
    $('.price-range-selection label.search-fld').removeClass("active");
    $(".community-options").hide("fast");
    $('.community-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();
    $('.area-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".area-selection .select-sec-options").is(":visible")) {
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    /* toggle the other icon */
    $('.floor-selection .select-sec-options').slideToggle();
    $('.floor-selection label.search-fld').toggleClass('active');
    $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;

  });

  $('.area-selection label.search-fld').click(function () {
    var pid = $(this).parent().attr("id");
    //console.log(pid);

    /* hide the other toggles */
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.price-range-selection .select-sec-options').slideUp();
    $('.price-range-selection label.search-fld').removeClass("active");
    $(".community-options").hide("fast");
    $('.community-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    /* toggle the other icon */
    $('.area-selection .select-sec-options').slideToggle();
    $('.area-selection label.search-fld').toggleClass('active');
    $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;

  });

$('.property-selection label.search-fld').click(function () {
    var pid = $(this).parent().attr("id");
    /* hide the other toggles */
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.price-range-selection .select-sec-options').slideUp();
    $('.price-range-selection label.search-fld').removeClass("active");
    $(".community-options").hide("fast");
    $('.community-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    /* toggle the other icon */
    $('.property-selection .select-sec-options').slideToggle();
    $('.property-selection label.search-fld').toggleClass('active');
    $('.property-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;
  });

  //here put the common function
  function summary_bedrooms_select() {
    var bedrooms_dropdown_array = [];
    var bedrooms_dropdown_string = "";
    //var element_id = $(this).attr('id');
    //var number = element_id.match(/\d+/);
    var single_string = "";
    $.each($('input[name="bed[]"]:checked'), function () {
      //single_string = $(this).val().toString().replace(' '+bedrooms_text+'','');
      //single_string = single_string.replace(' '+bedroom_text+'',''); 
      //element_id = $(this).attr('id');
      single_string = $(this).attr('id').match(/\d+/);
      if (single_string == "5")
        single_string = single_string + '+';
      //console.log(single_string);
      bedrooms_dropdown_array.push(single_string);
    });
    bedrooms_dropdown_string = bedrooms_dropdown_array.join(", ");
    //alert(bedrooms_dropdown_array);
    //bedrooms_dropdown_string = bedrooms_dropdown_array.toString();
    if (bedrooms_dropdown_string == '1') {
      bedrooms_dropdown_string = bedrooms_dropdown_array + ' ' + bedroom_text;
    } else {
      bedrooms_dropdown_string = bedrooms_dropdown_array + ' ' + bedrooms_text;
    }
    bedrooms_dropdown_string = bedrooms_dropdown_string.replace(/,/g, ", ");
    return (bedrooms_dropdown_string);
  }

  function summary_prices_select() {
    selectedPriceRange = currency_text + ' ' + parseInt($('select[name="min-price"]').val()).toLocaleString() + ' - ' + parseInt($('select[name="max-price"]').val()).toLocaleString();
    $('.price-range-selection').find('span.search-val').addClass('selected-val').text(selectedPriceRange);
    $('#price-for-mobile .search-val').addClass('selected-val').text(selectedPriceRange);
  }

  /* Clear Function  */
  $('.clear-selection').click(function (e) {
    //e.preventDefault();
    $(this).removeClass('active-clear');
	$(this).removeClass('active-clearall');
    selected_id = $(this).attr("id");
    if (selected_id == 'clear-community' || selected_id == 'clear-all-fields') {
      $('#prop_search_form input[name="comm[]"]:checkbox').prop('checked', false);
      //console.log("CLEAR COMMUNITY@@@@");
      //clear-community
      //document.getElementByName("comm").checked = false;
      $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
      //$('#clear-community').removeClass('active-clear');
    }
    if (selected_id == 'mobile-clear-community' || selected_id == 'clear-all-fields') {
      $('#communityModal input[name="comm[]"]:checkbox').prop('checked', false);
      //$('.community-selection').find('span.search-val').css({ 'color': '#232323' }).text(all_communities_text );
      //$('#clear-community').removeClass('active-clear'); 
    }
    if (selected_id == 'clear-bedrooms' || selected_id == 'clear-all-fields') {
      $('#prop_search_form input[name="bed[]"]:checkbox').prop('checked', false);
      $('.bedroom-selection').find('span.search-val').removeClass('selected-val').text(any_text);
    }
    if (selected_id == 'mobile-clear-bedrooms') {
      $('#bedroomsModal input[name="bed[]"]:checkbox').prop('checked', false);
    }
    if (selected_id == 'clear-price' || selected_id == 'mobile-clear-price' || selected_id == 'clear-all-fields') {
      $('select[name="min-price"] option[value="0"]').prop("selected", true);
      $('select[name="max-price"] option[value="20000000"]').prop("selected", true);
      $('#priceModal select[name="min-price"] option[value="0"]').prop("selected", true);
      $('#priceModal select[name="max-price"] option[value="20000000"]').prop("selected", true);
      $('.price-range-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      $('#price-for-mobile .search-val').text(any_text);
      //$('#clear-price').removeClass('active-clear');
    }
    if (selected_id == 'clear-property' || selected_id == 'clear-all-fields') {
      $('#prop_search_form input[name="p-type[]"]:checkbox').prop('checked', false);
      $('.property-type-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      //$('#clear-property').removeClass('active-clear');
      $('.community-options-desktop').html(CommunityDDBeforeAJax);
      $('.primary-communitylist-container').removeClass('property-community-list');
      $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
    }
    if (selected_id == 'mobile-clear-property') {
      $('#property-for-mobile .search-val').removeClass('selected-val').text(any_text);
      $('#propertyTypeModal input[name="p-type[]"]:checkbox').prop('checked', false);
      $('.community-options-mobile').html(CommunityDDBeforeAJax);
    }
    if (selected_id == 'clear-floor' || selected_id == 'clear-all-fields') {
      $('select[name="floor"] option[value="All"]').prop("selected", true);
      $('.floor-selection').find('span.search-val').removeClass('selected-val').text(any_text);
    }
    if (selected_id == 'clear-area' || selected_id == 'clear-all-fields') {
      $('select[name="min-area"] option').each(function () {
        $(this).showOption();
      });
      $('select[name="max-area"] option').each(function () {
        $(this).showOption();
      });
      $('select[name="min-area"] option[value="0"]').prop("selected", true);
      $('select[name="max-area"] option[value="0"]').prop("selected", true);
      $('.area-selection').find('span.search-val').removeClass('selected-val').text(any_text);
    }
	
	if (selected_id == 'clear-comm-property' || selected_id == 'clear-all-fields') {
    $('#prop_search_form input[name="prop[]"]:checkbox').prop('checked', false);
    $('.property-selection').find('span.search-val').removeClass('selected-val').text(any_text);
    //$('#clear-property').removeClass('active-clear');
    //$('.community-options-desktop').html(CommunityDDBeforeAJax);
    //$('.primary-communitylist-container').removeClass('property-community-list');
    $('.property-selection').find('span.search-val').removeClass('selected-val').text(all_properties_text)
  }
	
	if (selected_id == 'clear-all-fields') {
		('#clear-all-fields').removeClass('active-clearall');
	}
  });


  //Scripts for front page search filter enhancement

  $('input[name="bed[]"').on('change', function () {
    /* Bedrooms select dropdown */
    var bedrooms_dropdown_string1 = summary_bedrooms_select();
    if ($('input[name="bed[]"]:checked').length > 0) {
      $('.bedroom-selection').find('span.search-val').addClass('selected-val').text(bedrooms_dropdown_string1);
	  $('#bedroom-for-mobile .search-val').addClass('selected-val').text(bedrooms_dropdown_string1);
	  $('#clear-all-fields').addClass('active-clearall');
    } else {
      $('.bedroom-selection').find('span.search-val').removeClass('selected-val').text(any_text);
	  $('#bedroom-for-mobile .search-val').removeClass('selected-val').text(any_text);
    }
    /* End Bedrooms select dropdown */
  });

  $('input[name="comm[]"').on('change', function () {
    var checkedBoxes = $('input[name="comm[]"]:checked').length;
    //alert(checkedBoxes);
    var selected_msg_label = "";
    if (checkedBoxes > 0) {
      if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + community_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + communities_text;
      }
      $('.community-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
	  $('#community-for-mobile .search-val').addClass('selected-val').text(selected_msg_label);
	  $('#clear-all-fields').addClass('active-clearall');
    } else {
      $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
	  $('#community-for-mobile .search-val').removeClass('selected-val').text(all_communities_text);
    }
  });

  $(document).on('click', '.hero-content-wrapper input[name="comm[]"]', function () {
    //console.log("New Property Community List Clicked.");
    //alert(this);
    var checkedBoxes = $('input[name="comm[]"]:checked').length;
    //alert(checkedBoxes);
    var selected_msg_label = "";
    if (checkedBoxes > 0) {
      if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + community_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + communities_text;
      }
      $('.community-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
	  $('#community-for-mobile .search-val').addClass('selected-val').text(selected_msg_label);
      $('#clear-community').addClass('active-clear');
      if (checkMobile.matches) {
        $('#mobile-clear-community').addClass('active-clear');
      }

    } else {
      $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
      $('#clear-community').removeClass('active-clear');
      if (checkMobile.matches) {
        $('#mobile-clear-community').removeClass('active-clear');
      }

    }

  });

  $(document).on('click', '.home-search-component #clear-community', function () {
    //console.log("clear-community--CCCCCCCCCC");
    $('.home-search-component input[name="comm[]"]:checkbox').prop('checked', false);
    $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
    $('#clear-community').removeClass('active-clear');
  });

  $('select[name="min-price"]').on('change', function () {
    summary_prices_select();
  });

  $('select[name="max-price"]').on('change', function () {
    summary_prices_select();
  });


$('#priceModal select[name="min-price"]').on('change', function () {
	//console.log('summary_prices_select()');
	if ($('#priceModal select[name="min-price"]').val() == 0 & $('#priceModal select[name="max-price"]').val() == 100000000) {
	  /*selectedPriceRange = any_text;
		$('#price-for-mobile .search-val').removeClass('selected-val').text(selectedPriceRange);
		//alert(selectedPriceRange);  
	$('#mobile-clear-price').removeClass('active-clear');
	*/
	} else {
	  selectedPriceRange = currency_text + ' ' + parseInt($('#priceModal select[name="min-price"]').val()).toLocaleString() + ' - ' + parseInt($('#priceModal select[name="max-price"]').val()).toLocaleString();
	  $('#price-for-mobile .search-val').addClass('selected-val').text(selectedPriceRange);
	  //alert(selectedPriceRange);
	  $('#mobile-clear-price').addClass('active-clear');
	}
});

$('select[name="max-price-mobile"]').on('change', function () {
	//alert('summary_prices_select()');
	summary_prices_select();
});

  //END Scripts for front page search filter enhancement
  // Scripts for Home Page -- Mobile Filter 

$('#mobile-bedrooms-apply').click(function () {
	var bedrooms_dropdown_string1 = summary_bedrooms_select();
	$('#bedroomsModal').hide();
	$('#btn-show-filters').hide();
	$('.homepage-mobile-filter-section #prop_search_mobile_form').show();
	if ($('input[name="bed[]"]:checked').length > 0) {
	  $('#bedroom-for-mobile .search-val').addClass('selected-val').text(bedrooms_dropdown_string1);
	} else {
	  $('#bedroom-for-mobile .search-val').removeClass('selected-val').text(any_text);
	}
});


$('#mobile-community-apply').click(function () {
	$('#communityModal').hide();
	$('#btn-show-filters').hide();
	$('.homepage-mobile-filter-section #prop_search_mobile_form').show();
	var checkedBoxes = $('input[name="comm[]"]:checked').length;
	var selected_msg_label = "";
	if (checkedBoxes > 0) {
	  if (checkedBoxes == 1) {
		selected_msg_label = checkedBoxes + ' ' + community_text;
	  }
	  if (checkedBoxes > 1) {
		selected_msg_label = checkedBoxes + ' ' + communities_text;
	  }
	  $('#community-for-mobile .search-val').addClass('selected-val').text(selected_msg_label);
	} else {
	  $('#community-for-mobile .search-val').removeClass('selected-val').text(all_communities_text);
	}
});

$('#mobile-price-apply').click(function () {
	$('#priceModal').hide();
	$('#btn-show-filters').hide();
	$('.homepage-mobile-filter-section #prop_search_mobile_form').show();
	var min_price_mobile = $('#priceModal select[name="min-price"]').val();
	var max_price_mobile = $('#priceModal select[name="max-price"]').val();
	//console.log(min_price_mobile);
	//console.log(max_price_mobile);
	if ($('#priceModal select[name="min-price"]').val() == 0 & $('#priceModal select[name="max-price"]').val() == 100000000) {
	  selectedPriceRange = any_text;
	  $('#price-for-mobile .search-val').removeClass('selected-val').text(selectedPriceRange);
	  //alert(selectedPriceRange);    
	} else {
	  selectedPriceRange = currency_text + ' ' + parseInt($('#priceModal select[name="min-price"]').val()).toLocaleString() + ' - ' + parseInt($('#priceModal select[name="max-price"]').val()).toLocaleString();
	  $('#price-for-mobile .search-val').addClass('selected-val').text(selectedPriceRange);
	  //alert(selectedPriceRange);    
	}
});

$('#priceModal select[name="max-price"]').on('change', function () {
	//console.log('++++++++++++Changing Max Price');
	if ($(this).val() > 0) {

	  $('#mobile-clear-price').addClass('active-clear');
	} else {

	  $('#mobile-clear-price').removeClass('active-clear');
	}
	/* Onchange of min-price populate max price from min price onwards */
	/* Onchange populate min-price max-price */
	max_price_selection = parseInt($(this).children("option:selected").val());
	////console.log(max_price_selection);
	$('#priceModal select[name="min-price"] option').each(function () {
	  $(this).showOption();
	  currentItem = parseInt($(this).val());
	  ////console.log(currentItem);
	  if (currentItem > max_price_selection) {
		$(this).hideOption();
	  }

	});
});

$('#priceModal select[name="min-price"]').on('change', function () {
	//console.log('++++++++++++Changing Min Price');
	if ($(this).val() > 0) {
	  $('#mobile-clear-price').addClass('active-clear');
	} else {
	  $('#mobile-clear-price').removeClass('active-clear');
	}
	/* Onchange of min-price populate max price from min price onwards */
	min_price_selection = parseInt($(this).children("option:selected").val());
	////console.log(min_price_selection);
	$('#priceModal select[name="max-price"] option').each(function () {
	  $(this).showOption();
	  currentItem = parseInt($(this).val());
	  ////Console.log(currentItem);
	  if (currentItem < min_price_selection) {
		$(this).hideOption();
	  }
	});
});
 
// Phone masking function for Register your interest form
function initRYIF_1(){
	var checkNumber = false;
	$('#gform_5 #field_5_6.phone-intl-code select').find('option').each(function() {
	  if( !checkNumber ){
		var val = $(this).text();
		var hasNumber = /\d/;   
		var checkNumber = hasNumber.test(val);
	  }
	  if( checkNumber )
		return;
	  $(this).append(" " +$(this).val()); 
	});
	$('#gform_5 #field_5_6.phone-intl-code select').change(function(){
	  var selectedCountry = $(this).children("option:selected").val();
	  $( '#gform_5 #gfield_description_5_6 .phone-mask').html( selectedCountry );
	});
	$('#gform_5 #gfield_description_5_6 .phone-mask').html( $('#gform_5 #field_5_6.phone-intl-code select').val() );
}
function gfromFilterSpecialCharacters(){
  $('.filter-special-character input').on('input', function() {
    var c = this.selectionStart,
        r = /[^a-z0-9 ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });
  
  $('.allow-only-numbers input').on('input', function() {
    var c = this.selectionStart,
        r = /[^0-9]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });
  
  $('.allow-only-alphabets input').on('input', function() {
    var c = this.selectionStart,
        r = /[^a-z ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });
  
  $('.filter-special-character .has_city input').on('input', function(e) {
  v = $(this).val();
  //console.log(v);
  if(v.length >= 50)
    {
       console.log('Max length is greater than 50');
       $(this).val($(this).val().substr(0,50));
    }
  });
  $('.filter-symbols input').on('input', function() {
      var c = this.selectionStart,
      r = /[~`!@#$%\^&*()+=_\-\[\]\\';,./{}|\\":<>\?0-9]/gi,
      v = $(this).val();
      if(r.test(v)) {
        $(this).val(v.replace(r, ''));
        c--;
      }
      this.setSelectionRange(c, c);
  });

  //Form email filter characters
  $('.gform_wrapper div.ginput_container_email input').on('input', function(e) {
    var c = this.selectionStart,
    r = /[~`!#$%\^&*()+=\[\]\\';,/{}|\\": <>\?]/gi,
    v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });
  //Allow one space in between words
  $('.gform_wrapper input[type=text], .gform_wrapper textarea').on('input', function(e) {
    var c = this.selectionStart,
    r = /  /gi,
    v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ' '));
      c--;
    }
    this.setSelectionRange(c, c);
  });
}
jQuery(document).on('gform_post_render', function(event, form_id, current_page){
  if($('#gform_5').length > 0 && form_id == 5 )
  {
    initRYIF_1();
  }
  //Clone form for reload after submit
  if(formHtml['gf_'+form_id] == undefined)
  {
      formHtml['gf_'+form_id]= $('#gform_wrapper_'+form_id).closest('div.modal-body').html();	
  }
  gfromFilterSpecialCharacters();
});
initRYIF_1(); 
$("#gform_fields_5 .ginput_container_email #input_5_2").attr('maxlength','80');
$("#gform_fields_4 .ginput_container_email #input_4_1").attr('maxlength','80');

window.ryiv_form_introduction;
window.formName;
window.brochureTriggeredLead;
$(document).on("click", ".get-touch-btn", function() {
  formName = $(this).attr('data-formname');
  if (formName != '') {
      $('#input_5_24').val(formName);
      var ryi = $('#registerModal').attr('data-ryi');
      var git = $('#registerModal').attr('data-git');
	  var ryiv = $('#registerModal').attr('data-ryiv');
      var rypi = $('#registerModal').attr('data-rypi');
	  
      if (formName == 'Register your Interest') {
        $('#registerModal .gform_heading .gform_title').text(ryi);
        $('.schedule-call-info').text("");

      } else if (formName == 'Get in Touch') {
        if (git != '')
          $('#registerModal .gform_heading .gform_title').text(git);
        $('.schedule-call-info').text("");
      }
      else if (formName == 'Register Interest') {
        if (rypi != '')
          $('#registerModal .gform_heading .gform_title').text(rypi);
        $('.schedule-call-info').text("");
      }
      else if (formName == 'Schedule A Call') {
        if (ryiv != '')
          $('#registerModal .gform_heading .gform_title').text(ryiv);
        //console.log(ryiv_form_introduction);
        $('.schedule-call-info').text(ryiv_form_introduction);

      }
  }

  if( $(this).hasClass('brochure-upload') ){
    brochureTriggeredLead = true;
  }
  else{
    brochureTriggeredLead = false;
  }

});

  $('.home .prop-search-bar .container-search-property input[type="submit"], #prop_search_mobile_form input[type="submit"]').on('click', function(){
	$(".booking-overlay").show();
  });
  
});

/*! contentloaded.min.js - https://github.com/dperini/ContentLoaded - Author: Diego Perini - License: MIT */
function contentLoaded(b,i){var j=false,k=true,a=b.document,l=a.documentElement,f=a.addEventListener,h=f?'addEventListener':'attachEvent',n=f?'removeEventListener':'detachEvent',g=f?'':'on',c=function(d){if(d.type=='readystatechange'&&a.readyState!='complete')return;(d.type=='load'?b:a)[n](g+d.type,c,false);if(!j&&(j=true))i.call(b,d.type||d)},m=function(){try{l.doScroll('left')}catch(e){setTimeout(m,50);return}c('poll')};if(a.readyState=='complete')i.call(b,'lazy');else{if(!f&&l.doScroll){try{k=!b.frameElement}catch(e){}if(k)m()}a[h](g+'DOMContentLoaded',c,false);a[h](g+'readystatechange',c,false);b[h](g+'load',c,false)}}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getRefQueryParam(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function getUTMsFromQueryParam() {
    return {
        utm_source: getRefQueryParam("utm_source") || '',
      utm_medium: getRefQueryParam("utm_medium") || '',
      utm_content: getRefQueryParam("utm_content") || '',
      utm_campaign: getRefQueryParam("utm_campaign") || '',
      utm_term: getRefQueryParam("utm_term") || ''
    }
}

function persistUTMs() {
  if(getRefQueryParam("utm_source") || getRefQueryParam("utm_medium") || getRefQueryParam("utm_content") || getRefQueryParam("utm_campaign") || getRefQueryParam("utm_term")) {
    setCookie('emr_utms', JSON.stringify(getUTMsFromQueryParam()), 7);
  }
}

function getUTMs() {
  var emr_utms = {};
      try {
          emr_utms = JSON.parse(getCookie("emr_utms")) || {};
      } catch(e) { };

  return (emr_utms && (typeof emr_utms === "object") && emr_utms.hasOwnProperty("utm_source")) ? emr_utms : getUTMsFromQueryParam();
}

function getUTMSV2() {
  var emr_utms = {};
  try {
    emr_utms = JSON.parse(getCookie("emr_utms")) || {};
  } catch (e) {};

  return (emr_utms && (typeof emr_utms === "object") && emr_utms.hasOwnProperty("utm_source")) ? emr_utms : getUTMsFromQueryParam();
}

contentLoaded(window, persistUTMs);


$(".gform_button").click(function() {
    if ($(this).attr('data-init') == 'Y')
        return;
    $(this).attr('data-init', 'Y');
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

/* Scripts for Marketing Cloud Tracking code */
window.getInTouchEmail;
window.newsAndOffers;
$('#gform_5').submit(function () { 
  setTimeout(function(){ 
	  $('.gform_ajax_spinner').show()
	  getInTouchEmail = $('#input_5_2').val();  
  }, 600);
  if($('#choice_5_9_1').is(':checked'))
  {
    newsAndOffers = true;
  }else
  {
    newsAndOffers = false;
  }
});

jQuery(document).bind("gform_confirmation_loaded", function (event, form_id) { 
  if(form_id == 5 && newsAndOffers)
  {
	_etmc.push(["setOrgId", "510001196"]);     
	_etmc.push(["setUserInfo", {"email": getInTouchEmail}]);     
	_etmc.push(["trackPageView"]);
    	
  }
  // Trigger GTM Event on Successful Lead Form Submission
  if(form_id == 5) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "Su_Lead_Submission"
  });  
  }
});
/* End Scripts for Marketing Cloud Tracking code */

window.registerFormName;
window.registerFormEmail;
window.registerFormPhone;
$('#gform_5').submit(function () {
  registerFormName = $('#input_5_1').val();
  registerFormEmail = $('#input_5_2').val();
  registerFormPhone = $('#input_5_12').val();

  setTimeout(function () {
    $('.gform_ajax_spinner').show();
  }, 600);
});

jQuery(document).on('gform_confirmation_loaded', function(event, formId){
  // code to be trigger when confirmation page is loaded
  if( formId == 5 ){
    var SF_Lead_ProductID = getCookie('SF_Lead_ProductID');
    var SF_Lead_TransactionID = getCookie('SF_Lead_TransactionID');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'ProductID': SF_Lead_ProductID,
        'TransactionID' : 'RI' + SF_Lead_TransactionID
    });
    eraseCookie('SF_Lead_ProductID');
    eraseCookie('SF_Lead_TransactionID');

    var objPush = {
      'finished_flow': true, 
      'form_name':formName,
      'source' : SF_Lead_ProductID,
      'ref' : SF_Lead_TransactionID
    };

    if( brochureTriggeredLead ){
      objPush.brochure_trigger = true;
    }

    amplitude.getInstance().logEvent(
      'submit_lead', 
      objPush
    );

  }
});


// Home page slider hide and show of CTA (Get in touch)
$(window).scroll(function(){

  if(window.innerWidth < 992){
    
    var maxScrollPos = 0;
    if($('.cookie-disclaimer').is(":visible")){
      var cookieHgt = $('.cookie-disclaimer').height();
      maxScrollPos = 74 + cookieHgt;
    }else{
      maxScrollPos = 74;
    }

    var scrollPos = $(this).scrollTop();

    if(scrollPos > maxScrollPos){
      $('.sticky-prop-bar').show();
	  $('#btn-show-filters').addClass('show-hero-video-filter');
    }else{
      $('.sticky-prop-bar').hide();
	  $('#btn-show-filters').removeClass('show-hero-video-filter');
    }

  }

});


// Key under which name the cookie is saved
const cookieName = 'cookieconsent';
// The value could be used to store different levels of consent
const cookieValue = 'dismissed';

function dismiss() {
    const date = new Date();
    // Cookie is valid 1 year: now + (years x days x hours x minutes x seconds x milliseconds)
    date.setTime(date.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
    // Set cookie
    document.cookie = `${cookieName}=${cookieValue};expires=${date.toUTCString()};path=/`;

    // You probably want to remove the banner
    document.querySelector('.disclaimer-content').remove();
}

// Get button element
const buttonElement = document.querySelector('.btn-accept');
// Maybe cookie consent is not present
if (buttonElement) {
    // Listen on button click
    buttonElement.addEventListener('click', dismiss);
}

if( device != 'mobile' ){
  jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
  };
  jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
  };
  jQuery.event.special.wheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: true });
    }
  };
  jQuery.event.special.mousewheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: true });
    }
  };
}