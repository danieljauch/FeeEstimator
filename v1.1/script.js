$( document ).ready(function() {
  // Initial variables for later calculation
  var projectType1, projectType2, projectType;
  var occupRows = [];
  var readyForCalc = false;
  var valuation = 0;
  var total = 0;
  var planRevFee = 0;
  var permitFee = 0;
  var esaFee = 0;
  var smifFee = 0;
  var buildingFee = 4.5;
  var numUnits = 0;

  // Setting project categories
  $('#pg1 select').change(function() {
    if ($('#project-type-1').val() == "residential") {
      projectType1 = "R";
    } else if ($('#project-type-1').val() == "commercial") {
      projectType1 = "C";
    }
    if ($('#project-type-2').val() == "a new building") {
      projectType2 = "N";
    } else if ($('#project-type-2').val() == "a remodel on an existing building") {
      projectType2 = "R";
    } else if ($('#project-type-2').val() == "adding to an existing building") {
      projectType2 = "A";
    } else if ($('#project-type-2').val() == "both a remodel and an addition") {
      projectType2 = "B";
    }
    if ($('#project-type-1').val() && $('#project-type-2').val()) {
      $('.additional-permits').show().addClass('fade');
    } else {
      $('.additional-permits').hide().removeClass('fade');
    }
  });

  // Page 1 -> Page 2
  $('#pg1 .next').click(function () {
    $('#q1, #q2, #q3, #q4, #q5, #q6, #q7').hide();
    // Checks if the fields are ready before allowing next
    if ( $('#project-type-1').val() != "" && $('#project-type-2').val() != "" ) {
      projectType = projectType1 + projectType2;
      // Changes which question / tab / progress link is active
      $('.description').removeClass('open');
      $('#pg1, .tab-links li').removeClass('active');
      $('#pg2, #pg2-pointer').addClass('active');
      if (projectType == "RN" || projectType == "RA") {
        $('#q1').show().addClass('fade').html("<p>This project is <select id='structureType'><option></option><option>a single family home</option><option>a duplex</option><option>an accessory structure</option></select>.</p>");
        $('#q1 select').change(function() {
          if ( $(this).val() == "a single family home" ) {
            $('#q2').show().addClass('fade').html("<p>The new living space will total <input type='number' placeholder='0' min='0' step='50' id='livingSpaceArea'> square feet.</p><p>The new attached garage area will total <input type='number' placeholder='0' min='0' step='50' id='garageArea'> square feet.</p><p>The new premanufactured housing area will total <input type='number' placeholder='0' min='0' step='50' id='premanArea'> square feet.</p><p>The new unfinished basement area will total <input type='number' placeholder='0' min='0' step='50' id='basementArea'> square feet.</p><p>The new deck and / or porch area will total <input type='number' placeholder='0' min='0' step='50' id='deckArea'> square feet.</p>");
          } else if ( $(this).val() == "a duplex" ) {
            $('#q2').show().addClass('fade').html("<p>The new living space will total <input type='number' placeholder='0' min='0' step='50' id='livingSpaceArea'> square feet.</p><p>The new attached garage area will total <input type='number' placeholder='0' min='0' step='50' id='garageArea'> square feet.</p><p>The new premanufactured housing area will total <input type='number' placeholder='0' min='0' step='50' id='premanArea'> square feet.</p><p>The new unfinished basement area will total <input type='number' placeholder='0' min='0' step='50' id='basementArea'> square feet.</p><p>The new deck and / or porch area will total <input type='number' placeholder='0' min='0' step='50' id='deckArea'> square feet.</p>");
          } else if ( $(this).val() == "an accessory structure" ) {
            $('#q2').show().addClass('fade').html("<p>I would describe my accessory building(s) as...</p><p><input type='checkbox' name='garage'> <label for='garage'>A garage</label></p><p><input type='checkbox' name='carport'> <label for='carport'>A carport</label></p><p><input type='checkbox' name='other'> <label for='other'>Some other kind of structure</label></p>");
          } else {
            $('#q2, #q3, #q4, #q5').hide().removeClass('fade').html("");
          }
          $('input[name="garage"]').change( function () {
            if( $(this).is(':checked') ) {
              $('#q3').show().addClass('fade').html("<p>The new detached garage area will total <input type='number' placeholder='0' min='0' step='50' id='garageArea'> square feet.</p>");
            } else {
              $('#q3').hide().removeClass('fade').html("");
            }
          });
          $('input[name="carport"]').change( function () {
            if( $(this).is(':checked') ) {
              $('#q4').show().addClass('fade').html("<p>The new carport structure area will total <input type='number' placeholder='0' min='0' step='50' id='carportArea'> square feet.</p>");
            } else {
              $('#q4').hide().removeClass('fade').html("");
            }
          });
          $('input[name="other"]').change( function () {
            if( $(this).is(':checked') ) {
              $('#q5').show().addClass('fade').html("<p>The new other structure area will total <input type='number' placeholder='0' min='0' step='50' id='otherArea'> square feet.</p>");
            } else {
              $('#q5').hide().removeClass('fade').html("");
            }
          });
        });
      } else if (projectType == "RR" || projectType == "CR") {
        $('#q1').show().addClass('fade').html("<p>The total value of my building costs, materials, and labor for my remodel is $ <input type='number' placeholder='-.--' id='remodelCost' min='0' step='50'>.</p>");
      } else if (projectType == "CN" || projectType == "CA") {
        $('#q1').show().addClass('fade').html("<p>This building has <select id='occup-cat'><option></option><option>A-1 Assembly, theaters, with stage</option><option>A-1 Assembly, theaters, without stage</option><option>A-2 Assembly, nightclubs</option><option>A-2 Assembly, restaurants, bars, banquet halls</option><option>A-3 Assembly, churches</option><option>A-3 Assembly, general, community halls, libraries, museums</option><option>A-4 Assembly, arenas</option><option>B Business</option><option>E Educational</option><option>F-1 Factory and industrial, moderate hazard</option><option>F-2 Factory and industrial, low hazard</option><option>H-1 High Hazard, explosives</option><option>H234 High Hazard</option><option>H-5 HPM</option><option>I-1 Institutional, supervised environment</option><option>I-2 Institutional, hospitals</option><option>I-2 Institutional, nursing homes</option><option>I-3 Institutional, restrained</option><option>I-4 Institutional, day care facilities</option><option>M Mercantile</option><option>R-1 Residential, hotels</option><option>R-2 Residential, multiple family</option><option>R-3 Residential, one- and two-family</option><option>R-4 Residential, care/assisted living facilities</option><option>S-1 Storage, moderate hazard</option><option>S-2 Storage, low hazard</option><option>U Utility, miscellaneous</option></select> occupancy.</p>");
        $('#occup-cat').change(function() {
          if ( $(this).val() == "A-1 Assembly, theaters, with stage" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-1 Assembly, theaters, without stage" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-2 Assembly, nightclubs" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-3 Assembly, churches" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-3 Assembly, general, community halls, libraries, museums" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-4 Assembly, arenas" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "B Business" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "E Educational" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "F-1 Factory and industrial, moderate hazard" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "F-2 Factory and industrial, low hazard" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "H-1 High Hazard, explosives" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "H234 High Hazard" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "H-5 HPM" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "I-1 Institutional, supervised environment" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "I-2 Institutional, hospitals" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "I-2 Institutional, nursing homes" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "I-3 Institutional, restrained" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "I-4 Institutional, day care facilities" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "M Mercantile" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "R-1 Residential, hotels" ) {
            $('#q4').show().addClass('fade').html("There are <input type='number' placeholder='0' id='units' min='0' step='50'> units in this occupancy.");
          } else if ( $(this).val() == "R-2 Residential, multiple family" ) {
            $('#q4').show().addClass('fade').html("There are <input type='number' placeholder='0' id='units' min='0' step='50'> units in this occupancy.");
          } else if ( $(this).val() == "R-3 Residential, one- and two-family" ) {
            $('#q4').show().addClass('fade').html("There are <input type='number' placeholder='0' id='units' min='0' step='50'> units in this occupancy.");
          } else if ( $(this).val() == "R-4 Residential, care/assisted living facilities" ) {
            $('#q4').show().addClass('fade').html("There are <input type='number' placeholder='0' id='units' min='0' step='50'> units in this occupancy.");
          } else if ( $(this).val() == "S-1 Storage, moderate hazard" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "S-2 Storage, low hazard" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "U Utility, miscellaneous" ) {
            $('#q4').hide().removeClass('fade').html("");
          }

          $('#q2').show().addClass('fade').html("<p>This total area for this type of occupancy is <input id='cnArea' type='number' placeholder='0' min='0' step='50'> square feet.</p>");
          $('#q3').show().addClass('fade').html("<p>The type of construction for this project is <select id='constructionType'><option></option><option>IA</option><option>IB</option><option>IIA</option><option>IIB</option><option>IIIA</option><option>IIIB</option><option>IV</option><option>VA</option><option>VB</option></select></p><p class='disclaimer'>If you aren't sure, use VB</p>");
          $('#q6').show().addClass('fade').html("<span class='btn' id='occup-add'>There are more occupancy types</span>");
          if ( occupRows.length > 0 ) {
            $('#q5').show().addClass('fade').html("<table></table>");
            $('#q5 table').html("<tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr>");
            for ( i = 0; i < occupRows.length; i += 3 ) {
              $('#q5 table').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
            }
          } else {
            $('#q5').hide().removeClass('fade').html("");
          }

          // Allows for creation of more entries after the first occupancy type
          $('#q6 .btn').click(function () {
            // Check if the required fields are complete
            if ( $('#occup-cat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
              // Add current row to array
              occupRows.push($('#occup-cat').val(), $('#constructionType').val(), $('#cnArea').val());
              if ($('#units').val()) {
                numUnits += parseInt($('#units').val());
              }

              // Set up new table to display previous information
              $('#q5').show().addClass('fade').html("<table></table>");
              $('#q5 table').html("<tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr>");

              // For loop to run all rows into the table
              for ( i = 0; i < occupRows.length; i += 3 ) {
                $('#q5 table').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
              }

              // Resets question 1
              $('#q1 #occup-cat').val('');
              $('#q2, #q3, #q4').hide().removeClass('look-here').html("");
            } else {
              showError($(this), $('#occup-cat, #cnArea, #constructionType, #q4 input'));
            }
          });
        });
      } else if (projectType == "RB") {
        $('#q1').show().addClass('fade').html("<p>This <b>addition</b> project is <select id='structureType'><option></option><option>a single family home</option><option>a duplex</option><option>an accessory structure</option></select>.</p>");
        $('#q6').show().addClass('fade').html("<p>The total value of my building costs, materials, and labor for my <b>remodel</b> is $ <input type='number' placeholder='-.--' id='remodelCost' min='0' step='50'>.</p>");
        $('#q1 select').change(function() {
          if ( $(this).val() == "a single family home" ) {
            $('#q2').show().addClass('fade').html("<p>The new living space will total <input type='number' placeholder='0' min='0' step='50' id='livingSpaceArea'> square feet.</p><p>The new attached garage area will total <input type='number' placeholder='0' min='0' step='50' id='garageArea'> square feet.</p><p>The new premanufactured housing area will total <input type='number' placeholder='0' min='0' step='50' id='premanArea'> square feet.</p><p>The new unfinished basement area will total <input type='number' placeholder='0' min='0' step='50' id='basementArea'> square feet.</p><p>The new deck and / or porch area will total <input type='number' placeholder='0' min='0' step='50' id='deckArea'> square feet.</p>");
          } else if ( $(this).val() == "a duplex" ) {
            $('#q2').show().addClass('fade').html("<p>The new living space will total <input type='number' placeholder='0' min='0' step='50' id='livingSpaceArea'> square feet.</p><p>The new attached garage area will total <input type='number' placeholder='0' min='0' step='50' id='garageArea'> square feet.</p><p>The new premanufactured housing area will total <input type='number' placeholder='0' min='0' step='50' id='premanArea'> square feet.</p><p>The new unfinished basement area will total <input type='number' placeholder='0' min='0' step='50' id='basementArea'> square feet.</p><p>The new deck and / or porch area will total <input type='number' placeholder='0' min='0' step='50' id='deckArea'> square feet.</p>");
          } else if ( $(this).val() == "an accessory structure" ) {
            $('#q2').show().addClass('fade').html("<p>I would describe my accessory building(s) as...</p><p><input type='checkbox' name='garage'> <label for='garage'>A garage</label></p><p><input type='checkbox' name='carport'> <label for='carport'>A carport</label></p><p><input type='checkbox' name='other'> <label for='other'>Some other kind of structure</label></p>");
          } else {
            $('#q2, #q3, #q4, #q5').hide().removeClass('fade').html("");
          }
          $('input[name="garage"]').change( function () {
            if( $(this).is(':checked') ) {
              $('#q3').show().addClass('fade').html("<p>The new detached garage area will total <input type='number' placeholder='0' min='0' step='50' id='garageArea'> square feet.</p>");
            } else {
              $('#q3').hide().removeClass('fade').html("");
            }
          });
          $('input[name="carport"]').change( function () {
            if( $(this).is(':checked') ) {
              $('#q4').show().addClass('fade').html("<p>The new carport structure area will total <input type='number' placeholder='0' min='0' step='50' id='carportArea'> square feet.</p>");
            } else {
              $('#q4').hide().removeClass('fade').html("");
            }
          });
          $('input[name="other"]').change( function () {
            if( $(this).is(':checked') ) {
              $('#q5').show().addClass('fade').html("<p>The new other structure area will total <input type='number' placeholder='0' min='0' step='50' id='otherArea'> square feet.</p>");
            } else {
              $('#q5').hide().removeClass('fade').html("");
            }
          });
        });
      } else if (projectType == "CB") {
        $('#q1').show().addClass('fade').html("<p>This building <b>addition</b> has <select id='occup-cat'><option></option><option>A-1 Assembly, theaters, with stage</option><option>A-1 Assembly, theaters, without stage</option><option>A-2 Assembly, nightclubs</option><option>A-2 Assembly, restaurants, bars, banquet halls</option><option>A-3 Assembly, churches</option><option>A-3 Assembly, general, community halls, libraries, museums</option><option>A-4 Assembly, arenas</option><option>B Business</option><option>E Educational</option><option>F-1 Factory and industrial, moderate hazard</option><option>F-2 Factory and industrial, low hazard</option><option>H-1 High Hazard, explosives</option><option>H234 High Hazard</option><option>H-5 HPM</option><option>I-1 Institutional, supervised environment</option><option>I-2 Institutional, hospitals</option><option>I-2 Institutional, nursing homes</option><option>I-3 Institutional, restrained</option><option>I-4 Institutional, day care facilities</option><option>M Mercantile</option><option>R-1 Residential, hotels</option><option>R-2 Residential, multiple family</option><option>R-3 Residential, one- and two-family</option><option>R-4 Residential, care/assisted living facilities</option><option>S-1 Storage, moderate hazard</option><option>S-2 Storage, low hazard</option><option>U Utility, miscellaneous</option></select> occupancy.</p>");
        $('#q7').show().addClass('fade').html("<p>The total value of my building costs, materials, and labor for my <b>remodel</b> is $ <input type='number' placeholder='-.--' id='remodelCost' min='0' step='50'>.</p>");
        $('#occup-cat').change(function() {
          if ( $(this).val() == "A-1 Assembly, theaters, with stage" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-1 Assembly, theaters, without stage" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-2 Assembly, nightclubs" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-3 Assembly, churches" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-3 Assembly, general, community halls, libraries, museums" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "A-4 Assembly, arenas" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "B Business" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "E Educational" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "F-1 Factory and industrial, moderate hazard" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "F-2 Factory and industrial, low hazard" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "H-1 High Hazard, explosives" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "H234 High Hazard" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "H-5 HPM" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "I-1 Institutional, supervised environment" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "I-2 Institutional, hospitals" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "I-2 Institutional, nursing homes" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "I-3 Institutional, restrained" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "I-4 Institutional, day care facilities" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "M Mercantile" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "R-1 Residential, hotels" ) {
            $('#q4').show().addClass('fade').html("There are <input type='number' placeholder='0' id='units' min='0' step='50'> units in this occupancy.");
          } else if ( $(this).val() == "R-2 Residential, multiple family" ) {
            $('#q4').show().addClass('fade').html("There are <input type='number' placeholder='0' id='units' min='0' step='50'> units in this occupancy.");
          } else if ( $(this).val() == "R-3 Residential, one- and two-family" ) {
            $('#q4').show().addClass('fade').html("There are <input type='number' placeholder='0' id='units' min='0' step='50'> units in this occupancy.");
          } else if ( $(this).val() == "R-4 Residential, care/assisted living facilities" ) {
            $('#q4').show().addClass('fade').html("There are <input type='number' placeholder='0' id='units' min='0' step='50'> units in this occupancy.");
          } else if ( $(this).val() == "S-1 Storage, moderate hazard" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "S-2 Storage, low hazard" ) {
            $('#q4').hide().removeClass('fade').html("");
          } else if ( $(this).val() == "U Utility, miscellaneous" ) {
            $('#q4').hide().removeClass('fade').html("");
          }

          $('#q2').show().addClass('fade').html("<p>This total area for this type of occupancy is <input id='cnArea' type='number' placeholder='0' min='0' step='50'> square feet.</p>");
          $('#q3').show().addClass('fade').html("<p>The type of construction for this project is <select id='constructionType'><option></option><option>IA</option><option>IB</option><option>IIA</option><option>IIB</option><option>IIIA</option><option>IIIB</option><option>IV</option><option>VA</option><option>VB</option></select></p><p class='disclaimer'>If you aren't sure, use VB</p>");
          $('#q6').show().addClass('fade').html("<span class='btn' id='occup-add'>There are more occupancy types</span>");
          if ( occupRows.length > 0 ) {
            $('#q5').show().addClass('fade').html("<table></table>");
            $('#q5 table').html("<tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr>");
            for ( i = 0; i < occupRows.length; i += 3 ) {
              $('#q5 table').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
            }
          } else {
            $('#q5').hide().removeClass('fade').html("");
          }

          // Allows for creation of more entries after the first occupancy type
          $('#q6 .btn').click(function () {
            // Check if the required fields are complete
            if ( $('#occup-cat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
              // Add current row to array
              occupRows.push($('#occup-cat').val(), $('#constructionType').val(), $('#cnArea').val());
              numUnits += parseInt($('#units').val());

              // Set up new table to display previous information
              $('#q5').show().addClass('fade').html("<table></table>");
              $('#q5 table').html("<tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr>");

              // For loop to run all rows into the table
              for ( i = 0; i < occupRows.length; i += 3 ) {
                $('#q5 table').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
              }

              // Resets question 1
              $('#q1 #occup-cat').val('');
              $('#q2, #q3, #q4').hide();
            } else {
              showError($(this), $('#occup-cat, #cnArea, #constructionType, #q4 input'));
            }
          });
        });
      }
    } else {
      showError($(this), $('#pg1 select'));
    }
  });
  // Checks if all the information is filled out before moving forward
  $('#pg2 .next').click(function () {
    // come 2
    if (projectType == "RN" || projectType == "RA") {
      if ( $('#q1 select').val() == "a single family home" || $('#q1 select').val() == "a duplex" ) {
        $('#q2 input').each(function () {
          if ( $(this).val() > 0 ) {
            readyForCalc = true;
          }
        });
      } else if ( $('#q1 select').val() == "an accessory structure" ) {
        if ( $('input[name="garage"]').is(':checked') && $('#garageArea').val() > 0 ) {
          readyForCalc = true;
        }
        if ( $('input[name="carport"]').is(':checked') && $('#carportArea').val() > 0 ) {
          readyForCalc = true;
        }
        if ( $('input[name="other"]').is(':checked') && $('#otherArea').val() > 0 ) {
          readyForCalc = true;
        }
      }
    } else if (projectType == "RR" || projectType == "CR") {
      if ($('#q1 input').val() > 0) {
        readyForCalc = true;
      }
    } else if (projectType == "CN" || projectType == "CA") {
      if ( $('#units').val() > 0 ) {
        numUnits += parseInt($('#units').val());
      }
      if ( occupRows.length > 0 ) {
        if ($('#occup-cat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
          occupRows.push($('#occup-cat').val(), $('#constructionType').val(), $('#cnArea').val());
        }
        readyForCalc = true;
      } else if ( occupRows.length == 0 && $('#occup-cat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0 ) {
        occupRows.push($('#occup-cat').val(), $('#constructionType').val(), $('#cnArea').val());
        readyForCalc = true;
      }
    } else if (projectType == "RB") {
      if ($('#remodelCost').val() > 0) {
        if ( $('#q1 select').val() == "a single family home" || $('#q1 select').val() == "a duplex" ) {
          $('#q2 input').each(function () {
            if ( $(this).val() > 0 ) {
              readyForCalc = true;
            }
          });
        } else if ( $('#q1 select').val() == "an accessory structure" ) {
          if ( $('input[name="garage"]').is(':checked') && $('#garageArea').val() > 0 ) {
            readyForCalc = true;
          }
          if ( $('input[name="carport"]').is(':checked') && $('#carportArea').val() > 0 ) {
            readyForCalc = true;
          }
          if ( $('input[name="other"]').is(':checked') && $('#otherArea').val() > 0 ) {
            readyForCalc = true;
          }
        }
      }
    } else if (projectType == "CB") {
      if ( $('#units').val() > 0 ) {
        numUnits += parseInt($('#units').val());
      }
      if ($('#remodelCost').val() > 0) {
        if ( occupRows.length > 0 ) {
          if ($('#occup-cat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
            occupRows.push($('#occup-cat').val(), $('#constructionType').val(), $('#cnArea').val());
          }
          readyForCalc = true;
        } else if ( occupRows.length == 0 && $('#occup-cat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0 ) {
          occupRows.push($('#occup-cat').val(), $('#constructionType').val(), $('#cnArea').val());
          readyForCalc = true;
        }
      }
    }
    if (readyForCalc) {
      // Value the property
      if (projectType == "RN" || projectType == "RA" || projectType == "RB") {
        valuation = 112.65;
      }
      for ( i = 0; i < occupRows.length; i += 3 ) {
        if ( occupRows[i + 1] == "IA" ) {
          if ( occupRows[i] == "A-1 Assembly, theaters, with stage" ) {
            valuation += occupRows[i + 2] * 226.92;
          } else if ( occupRows[i] == "A-1 Assembly, theaters, without stage" ) {
            valuation += occupRows[i + 2] * 207.97;
          } else if ( occupRows[i] == "A-2 Assembly, nightclubs" ) {
            valuation += occupRows[i + 2] * 177.49;
          } else if ( occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            valuation += occupRows[i + 2] * 176.49;
          } else if ( occupRows[i] == "A-3 Assembly, churches" ) {
            valuation += occupRows[i + 2] * 209.94;
          } else if ( occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums" ) {
            valuation += occupRows[i + 2] * 175.12;
          } else if ( occupRows[i] == "A-4 Assembly, arenas" ) {
            valuation += occupRows[i + 2] * 206.97;
          } else if ( occupRows[i] == "B Business" ) {
            valuation += occupRows[i + 2] * 181.12;
          } else if ( occupRows[i] == "E Educational" ) {
            valuation += occupRows[i + 2] * 192.29;
          } else if ( occupRows[i] == "F-1 Factory and industrial, moderate hazard" ) {
            valuation += occupRows[i + 2] * 108.53;
          } else if ( occupRows[i] == "F-2 Factory and industrial, low hazard" ) {
            valuation += occupRows[i + 2] * 107.53;
          } else if ( occupRows[i] == "H-1 High Hazard, explosives" ) {
            valuation += occupRows[i + 2] * 101.60;
          } else if ( occupRows[i] == "H234 High Hazard" ) {
            valuation += occupRows[i + 2] * 101.60;
          } else if ( occupRows[i] == "H-5 HPM" ) {
            valuation += occupRows[i + 2] * 181.12;
          } else if ( occupRows[i] == "I-1 Institutional, supervised environment" ) {
            valuation += occupRows[i + 2] * 180.72;
          } else if ( occupRows[i] == "I-2 Institutional, hospitals" ) {
            valuation += occupRows[i + 2] * 304.80;
          } else if ( occupRows[i] == "I-2 Institutional, nursing homes" ) {
            valuation += occupRows[i + 2] * 211.20;
          } else if ( occupRows[i] == "I-3 Institutional, restrained" ) {
            valuation += occupRows[i + 2] * 206.08;
          } else if ( occupRows[i] == "I-4 Institutional, day care facilities" ) {
            valuation += occupRows[i + 2] * 180.72;
          } else if ( occupRows[i] == "M Mercantile" ) {
            valuation += occupRows[i + 2] * 132.23;
          } else if ( occupRows[i] == "R-1 Residential, hotels" ) {
            valuation += occupRows[i + 2] * 182.28;
          } else if ( occupRows[i] == "R-2 Residential, multiple family" ) {
            valuation += occupRows[i + 2] * 152.86;
          } else if ( occupRows[i] == "R-3 Residential, one- and two-family" ) {
            valuation += occupRows[i + 2] * 143.93;
          } else if ( occupRows[i] == "R-4 Residential, care/assisted living facilities" ) {
            valuation += occupRows[i + 2] * 180.72;
          } else if ( occupRows[i] == "S-1 Storage, moderate hazard" ) {
            valuation += occupRows[i + 2] * 100.60;
          } else if ( occupRows[i] == "S-2 Storage, low hazard" ) {
            valuation += occupRows[i + 2] * 99.60;
          } else if ( occupRows[i] == "U Utility, miscellaneous" ) {
            valuation += occupRows[i + 2] * 77.82;
          }
        } else if ( occupRows[i + 1] == "IB" ) {
          if ( occupRows[i] == "A-1 Assembly, theaters, with stage" ) {
            valuation += occupRows[i + 2] * 219.10;
          } else if ( occupRows[i] == "A-1 Assembly, theaters, without stage" ) {
            valuation += occupRows[i + 2] * 200.15;
          } else if ( occupRows[i] == "A-2 Assembly, nightclubs" ) {
            valuation += occupRows[i + 2] * 172.34;
          } else if ( occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            valuation += occupRows[i + 2] * 171.34;
          } else if ( occupRows[i] == "A-3 Assembly, churches" ) {
            valuation += occupRows[i + 2] * 202.13;
          } else if ( occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums" ) {
            valuation += occupRows[i + 2] * 167.31;
          } else if ( occupRows[i] == "A-4 Assembly, arenas" ) {
            valuation += occupRows[i + 2] * 199.15;
          } else if ( occupRows[i] == "B Business" ) {
            valuation += occupRows[i + 2] * 174.43;
          } else if ( occupRows[i] == "E Educational" ) {
            valuation += occupRows[i + 2] * 185.47;
          } else if ( occupRows[i] == "F-1 Factory and industrial, moderate hazard" ) {
            valuation += occupRows[i + 2] * 103.54;
          } else if ( occupRows[i] == "F-2 Factory and industrial, low hazard" ) {
            valuation += occupRows[i + 2] * 102.54;
          } else if ( occupRows[i] == "H-1 High Hazard, explosives" ) {
            valuation += occupRows[i + 2] * 96.60;
          } else if ( occupRows[i] == "H234 High Hazard" ) {
            valuation += occupRows[i + 2] * 96.60;
          } else if ( occupRows[i] == "H-5 HPM" ) {
            valuation += occupRows[i + 2] * 174.43;
          } else if ( occupRows[i] == "I-1 Institutional, supervised environment" ) {
            valuation += occupRows[i + 2] * 174.14;
          } else if ( occupRows[i] == "I-2 Institutional, hospitals" ) {
            valuation += occupRows[i + 2] * 298.11;
          } else if ( occupRows[i] == "I-2 Institutional, nursing homes" ) {
            valuation += occupRows[i + 2] * 204.51;
          } else if ( occupRows[i] == "I-3 Institutional, restrained" ) {
            valuation += occupRows[i + 2] * 199.38;
          } else if ( occupRows[i] == "I-4 Institutional, day care facilities" ) {
            valuation += occupRows[i + 2] * 174.14;
          } else if ( occupRows[i] == "M Mercantile" ) {
            valuation += occupRows[i + 2] * 127.09;
          } else if ( occupRows[i] == "R-1 Residential, hotels" ) {
            valuation += occupRows[i + 2] * 175.70;
          } else if ( occupRows[i] == "R-2 Residential, multiple family" ) {
            valuation += occupRows[i + 2] * 146.27;
          } else if ( occupRows[i] == "R-3 Residential, one- and two-family" ) {
            valuation += occupRows[i + 2] * 139.97;
          } else if ( occupRows[i] == "R-4 Residential, care/assisted living facilities" ) {
            valuation += occupRows[i + 2] * 174.14;
          } else if ( occupRows[i] == "S-1 Storage, moderate hazard" ) {
            valuation += occupRows[i + 2] * 95.60;
          } else if ( occupRows[i] == "S-2 Storage, low hazard" ) {
            valuation += occupRows[i + 2] * 94.60;
          } else if ( occupRows[i] == "U Utility, miscellaneous" ) {
            valuation += occupRows[i + 2] * 73.48;
          }
        } else if ( occupRows[i + 1] == "IIA" ) {
          if ( occupRows[i] == "A-1 Assembly, theaters, with stage" ) {
            valuation += occupRows[i + 2] * 213.80;
          } else if ( occupRows[i] == "A-1 Assembly, theaters, without stage" ) {
            valuation += occupRows[i + 2] * 194.85;
          } else if ( occupRows[i] == "A-2 Assembly, nightclubs" ) {
            valuation += occupRows[i + 2] * 167.98;
          } else if ( occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            valuation += occupRows[i + 2] * 165.98;
          } else if ( occupRows[i] == "A-3 Assembly, churches" ) {
            valuation += occupRows[i + 2] * 196.83;
          } else if ( occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums" ) {
            valuation += occupRows[i + 2] * 161.01;
          } else if ( occupRows[i] == "A-4 Assembly, arenas" ) {
            valuation += occupRows[i + 2] * 192.85;
          } else if ( occupRows[i] == "B Business" ) {
            valuation += occupRows[i + 2] * 168.67;
          } else if ( occupRows[i] == "E Educational" ) {
            valuation += occupRows[i + 2] * 180.15;
          } else if ( occupRows[i] == "F-1 Factory and industrial, moderate hazard" ) {
            valuation += occupRows[i + 2] * 97.56;
          } else if ( occupRows[i] == "F-2 Factory and industrial, low hazard" ) {
            valuation += occupRows[i + 2] * 97.56;
          } else if ( occupRows[i] == "H-1 High Hazard, explosives" ) {
            valuation += occupRows[i + 2] * 91.63;
          } else if ( occupRows[i] == "H234 High Hazard" ) {
            valuation += occupRows[i + 2] * 91.63;
          } else if ( occupRows[i] == "H-5 HPM" ) {
            valuation += occupRows[i + 2] * 168.67;
          } else if ( occupRows[i] == "I-1 Institutional, supervised environment" ) {
            valuation += occupRows[i + 2] * 169.28;
          } else if ( occupRows[i] == "I-2 Institutional, hospitals" ) {
            valuation += occupRows[i + 2] * 292.36;
          } else if ( occupRows[i] == "I-2 Institutional, nursing homes" ) {
            valuation += occupRows[i + 2] * 198.75;
          } else if ( occupRows[i] == "I-3 Institutional, restrained" ) {
            valuation += occupRows[i + 2] * 193.63;
          } else if ( occupRows[i] == "I-4 Institutional, day care facilities" ) {
            valuation += occupRows[i + 2] * 169.28;
          } else if ( occupRows[i] == "M Mercantile" ) {
            valuation += occupRows[i + 2] * 121.73;
          } else if ( occupRows[i] == "R-1 Residential, hotels" ) {
            valuation += occupRows[i + 2] * 170.83;
          } else if ( occupRows[i] == "R-2 Residential, multiple family" ) {
            valuation += occupRows[i + 2] * 141.41;
          } else if ( occupRows[i] == "R-3 Residential, one- and two-family" ) {
            valuation += occupRows[i + 2] * 136.51;
          } else if ( occupRows[i] == "R-4 Residential, care/assisted living facilities" ) {
            valuation += occupRows[i + 2] * 169.28;
          } else if ( occupRows[i] == "S-1 Storage, moderate hazard" ) {
            valuation += occupRows[i + 2] * 89.63;
          } else if ( occupRows[i] == "S-2 Storage, low hazard" ) {
            valuation += occupRows[i + 2] * 89.63;
          } else if ( occupRows[i] == "U Utility, miscellaneous" ) {
            valuation += occupRows[i + 2] * 69.04;
          }
        } else if ( occupRows[i + 1] == "IIB" ) {
          if ( occupRows[i] == "A-1 Assembly, theaters, with stage" ) {
            valuation += occupRows[i + 2] * 205.04;
          } else if ( occupRows[i] == "A-1 Assembly, theaters, without stage" ) {
            valuation += occupRows[i + 2] * 186.09;
          } else if ( occupRows[i] == "A-2 Assembly, nightclubs" ) {
            valuation += occupRows[i + 2] * 161.18;
          } else if ( occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            valuation += occupRows[i + 2] * 160.18;
          } else if ( occupRows[i] == "A-3 Assembly, churches" ) {
            valuation += occupRows[i + 2] * 188.07;
          } else if ( occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums" ) {
            valuation += occupRows[i + 2] * 153.25;
          } else if ( occupRows[i] == "A-4 Assembly, arenas" ) {
            valuation += occupRows[i + 2] * 185.09;
          } else if ( occupRows[i] == "B Business" ) {
            valuation += occupRows[i + 2] * 160.26;
          } else if ( occupRows[i] == "E Educational" ) {
            valuation += occupRows[i + 2] * 172.12;
          } else if ( occupRows[i] == "F-1 Factory and industrial, moderate hazard" ) {
            valuation += occupRows[i + 2] * 93.81;
          } else if ( occupRows[i] == "F-2 Factory and industrial, low hazard" ) {
            valuation += occupRows[i + 2] * 92.81;
          } else if ( occupRows[i] == "H-1 High Hazard, explosives" ) {
            valuation += occupRows[i + 2] * 86.88;
          } else if ( occupRows[i] == "H234 High Hazard" ) {
            valuation += occupRows[i + 2] * 86.88;
          } else if ( occupRows[i] == "H-5 HPM" ) {
            valuation += occupRows[i + 2] * 160.26;
          } else if ( occupRows[i] == "I-1 Institutional, supervised environment" ) {
            valuation += occupRows[i + 2] * 161.12;
          } else if ( occupRows[i] == "I-2 Institutional, hospitals" ) {
            valuation += occupRows[i + 2] * 283.95;
          } else if ( occupRows[i] == "I-2 Institutional, nursing homes" ) {
            valuation += occupRows[i + 2] * 190.34;
          } else if ( occupRows[i] == "I-3 Institutional, restrained" ) {
            valuation += occupRows[i + 2] * 185.22;
          } else if ( occupRows[i] == "I-4 Institutional, day care facilities" ) {
            valuation += occupRows[i + 2] * 161.12;
          } else if ( occupRows[i] == "M Mercantile" ) {
            valuation += occupRows[i + 2] * 115.92;
          } else if ( occupRows[i] == "R-1 Residential, hotels" ) {
            valuation += occupRows[i + 2] * 162.68;
          } else if ( occupRows[i] == "R-2 Residential, multiple family" ) {
            valuation += occupRows[i + 2] * 133.25;
          } else if ( occupRows[i] == "R-3 Residential, one- and two-family" ) {
            valuation += occupRows[i + 2] * 132.83;
          } else if ( occupRows[i] == "R-4 Residential, care/assisted living facilities" ) {
            valuation += occupRows[i + 2] * 161.12;
          } else if ( occupRows[i] == "S-1 Storage, moderate hazard" ) {
            valuation += occupRows[i + 2] * 85.88;
          } else if ( occupRows[i] == "S-2 Storage, low hazard" ) {
            valuation += occupRows[i + 2] * 84.88;
          } else if ( occupRows[i] == "U Utility, miscellaneous" ) {
            valuation += occupRows[i + 2] * 65.52;
          }
        } else if ( occupRows[i + 1] == "IIIA" ) {
          if ( occupRows[i] == "A-1 Assembly, theaters, with stage" ) {
            valuation += occupRows[i + 2] * 192.95;
          } else if ( occupRows[i] == "A-1 Assembly, theaters, without stage" ) {
            valuation += occupRows[i + 2] * 174.15;
          } else if ( occupRows[i] == "A-2 Assembly, nightclubs" ) {
            valuation += occupRows[i + 2] * 151.95;
          } else if ( occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            valuation += occupRows[i + 2] * 149.95;
          } else if ( occupRows[i] == "A-3 Assembly, churches" ) {
            valuation += occupRows[i + 2] * 176.32;
          } else if ( occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums" ) {
            valuation += occupRows[i + 2] * 140.50;
          } else if ( occupRows[i] == "A-4 Assembly, arenas" ) {
            valuation += occupRows[i + 2] * 172.15;
          } else if ( occupRows[i] == "B Business" ) {
            valuation += occupRows[i + 2] * 146.18;
          } else if ( occupRows[i] == "E Educational" ) {
            valuation += occupRows[i + 2] * 160.72;
          } else if ( occupRows[i] == "F-1 Factory and industrial, moderate hazard" ) {
            valuation += occupRows[i + 2] * 84.17;
          } else if ( occupRows[i] == "F-2 Factory and industrial, low hazard" ) {
            valuation += occupRows[i + 2] * 84.17;
          } else if ( occupRows[i] == "H-1 High Hazard, explosives" ) {
            valuation += occupRows[i + 2] * 78.44;
          } else if ( occupRows[i] == "H234 High Hazard" ) {
            valuation += occupRows[i + 2] * 78.44;
          } else if ( occupRows[i] == "H-5 HPM" ) {
            valuation += occupRows[i + 2] * 146.18;
          } else if ( occupRows[i] == "I-1 Institutional, supervised environment" ) {
            valuation += occupRows[i + 2] * 149.06;
          } else if ( occupRows[i] == "I-2 Institutional, hospitals" ) {
            valuation += occupRows[i + 2] * 268.92;
          } else if ( occupRows[i] == "I-2 Institutional, nursing homes" ) {
            valuation += occupRows[i + 2] * 177.26;
          } else if ( occupRows[i] == "I-3 Institutional, restrained" ) {
            valuation += occupRows[i + 2] * 172.62;
          } else if ( occupRows[i] == "I-4 Institutional, day care facilities" ) {
            valuation += occupRows[i + 2] * 149.06;
          } else if ( occupRows[i] == "M Mercantile" ) {
            valuation += occupRows[i + 2] * 106.18;
          } else if ( occupRows[i] == "R-1 Residential, hotels" ) {
            valuation += occupRows[i + 2] * 150.87;
          } else if ( occupRows[i] == "R-2 Residential, multiple family" ) {
            valuation += occupRows[i + 2] * 122.04;
          } else if ( occupRows[i] == "R-3 Residential, one- and two-family" ) {
            valuation += occupRows[i + 2] * 127.95;
          } else if ( occupRows[i] == "R-4 Residential, care/assisted living facilities" ) {
            valuation += occupRows[i + 2] * 149.06;
          } else if ( occupRows[i] == "S-1 Storage, moderate hazard" ) {
            valuation += occupRows[i + 2] * 76.44;
          } else if ( occupRows[i] == "S-2 Storage, low hazard" ) {
            valuation += occupRows[i + 2] * 76.44;
          } else if ( occupRows[i] == "U Utility, miscellaneous" ) {
            valuation += occupRows[i + 2] * 59.23;
          }
        } else if ( occupRows[i + 1] == "IIIB" ) {
          if ( occupRows[i] == "A-1 Assembly, theaters, with stage" ) {
            valuation += occupRows[i + 2] * 187.36;
          } else if ( occupRows[i] == "A-1 Assembly, theaters, without stage" ) {
            valuation += occupRows[i + 2] * 168.55;
          } else if ( occupRows[i] == "A-2 Assembly, nightclubs" ) {
            valuation += occupRows[i + 2] * 147.76;
          } else if ( occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            valuation += occupRows[i + 2] * 146.76;
          } else if ( occupRows[i] == "A-3 Assembly, churches" ) {
            valuation += occupRows[i + 2] * 170.72;
          } else if ( occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums" ) {
            valuation += occupRows[i + 2] * 135.90;
          } else if ( occupRows[i] == "A-4 Assembly, arenas" ) {
            valuation += occupRows[i + 2] * 167.55;
          } else if ( occupRows[i] == "B Business" ) {
            valuation += occupRows[i + 2] * 140.70;
          } else if ( occupRows[i] == "E Educational" ) {
            valuation += occupRows[i + 2] * 152.55;
          } else if ( occupRows[i] == "F-1 Factory and industrial, moderate hazard" ) {
            valuation += occupRows[i + 2] * 80.36;
          } else if ( occupRows[i] == "F-2 Factory and industrial, low hazard" ) {
            valuation += occupRows[i + 2] * 79.36;
          } else if ( occupRows[i] == "H-1 High Hazard, explosives" ) {
            valuation += occupRows[i + 2] * 73.62;
          } else if ( occupRows[i] == "H234 High Hazard" ) {
            valuation += occupRows[i + 2] * 73.62;
          } else if ( occupRows[i] == "H-5 HPM" ) {
            valuation += occupRows[i + 2] * 140.70;
          } else if ( occupRows[i] == "I-1 Institutional, supervised environment" ) {
            valuation += occupRows[i + 2] * 145.04;
          } else if ( occupRows[i] == "I-2 Institutional, hospitals" ) {
            valuation = 0;
          } else if ( occupRows[i] == "I-2 Institutional, nursing homes" ) {
            valuation = 0;
          } else if ( occupRows[i] == "I-3 Institutional, restrained" ) {
            valuation += occupRows[i + 2] * 166.14;
          } else if ( occupRows[i] == "I-4 Institutional, day care facilities" ) {
            valuation += occupRows[i + 2] * 145.04;
          } else if ( occupRows[i] == "M Mercantile" ) {
            valuation += occupRows[i + 2] * 102.99;
          } else if ( occupRows[i] == "R-1 Residential, hotels" ) {
            valuation += occupRows[i + 2] * 146.84;
          } else if ( occupRows[i] == "R-2 Residential, multiple family" ) {
            valuation += occupRows[i + 2] * 118.01;
          } else if ( occupRows[i] == "R-3 Residential, one- and two-family" ) {
            valuation += occupRows[i + 2] * 124.61;
          } else if ( occupRows[i] == "R-4 Residential, care/assisted living facilities" ) {
            valuation += occupRows[i + 2] * 145.04;
          } else if ( occupRows[i] == "S-1 Storage, moderate hazard" ) {
            valuation += occupRows[i + 2] * 72.62;
          } else if ( occupRows[i] == "S-2 Storage, low hazard" ) {
            valuation += occupRows[i + 2] * 71.62;
          } else if ( occupRows[i] == "U Utility, miscellaneous" ) {
            valuation += occupRows[i + 2] * 55.31;
          }
        } else if ( occupRows[i + 1] == "IV" ) {
          if ( occupRows[i] == "A-1 Assembly, theaters, with stage" ) {
            valuation += occupRows[i + 2] * 198.56;
          } else if ( occupRows[i] == "A-1 Assembly, theaters, without stage" ) {
            valuation += occupRows[i + 2] * 179.61;
          } else if ( occupRows[i] == "A-2 Assembly, nightclubs" ) {
            valuation += occupRows[i + 2] * 155.52;
          } else if ( occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            valuation += occupRows[i + 2] * 154.52;
          } else if ( occupRows[i] == "A-3 Assembly, churches" ) {
            valuation += occupRows[i + 2] * 181.59;
          } else if ( occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums" ) {
            valuation += occupRows[i + 2] * 146.77;
          } else if ( occupRows[i] == "A-4 Assembly, arenas" ) {
            valuation += occupRows[i + 2] * 178.61;
          } else if ( occupRows[i] == "B Business" ) {
            valuation += occupRows[i + 2] * 153.97;
          } else if ( occupRows[i] == "E Educational" ) {
            valuation += occupRows[i + 2] * 166.18;
          } else if ( occupRows[i] == "F-1 Factory and industrial, moderate hazard" ) {
            valuation += occupRows[i + 2] * 89.86;
          } else if ( occupRows[i] == "F-2 Factory and industrial, low hazard" ) {
            valuation += occupRows[i + 2] * 88.86;
          } else if ( occupRows[i] == "H-1 High Hazard, explosives" ) {
            valuation += occupRows[i + 2] * 82.93;
          } else if ( occupRows[i] == "H234 High Hazard" ) {
            valuation += occupRows[i + 2] * 82.93;
          } else if ( occupRows[i] == "H-5 HPM" ) {
            valuation += occupRows[i + 2] * 153.97;
          } else if ( occupRows[i] == "I-1 Institutional, supervised environment" ) {
            valuation += occupRows[i + 2] * 161.12;
          } else if ( occupRows[i] == "I-2 Institutional, hospitals" ) {
            valuation += occupRows[i + 2] * 277.65;
          } else if ( occupRows[i] == "I-2 Institutional, nursing homes" ) {
            valuation += occupRows[i + 2] * 184.05;
          } else if ( occupRows[i] == "I-3 Institutional, restrained" ) {
            valuation += occupRows[i + 2] * 178.93;
          } else if ( occupRows[i] == "I-4 Institutional, day care facilities" ) {
            valuation += occupRows[i + 2] * 161.12;
          } else if ( occupRows[i] == "M Mercantile" ) {
            valuation += occupRows[i + 2] * 110.26;
          } else if ( occupRows[i] == "R-1 Residential, hotels" ) {
            valuation += occupRows[i + 2] * 162.68;
          } else if ( occupRows[i] == "R-2 Residential, multiple family" ) {
            valuation += occupRows[i + 2] * 133.25;
          } else if ( occupRows[i] == "R-3 Residential, one- and two-family" ) {
            valuation += occupRows[i + 2] * 130.57;
          } else if ( occupRows[i] == "R-4 Residential, care/assisted living facilities" ) {
            valuation += occupRows[i + 2] * 161.12;
          } else if ( occupRows[i] == "S-1 Storage, moderate hazard" ) {
            valuation += occupRows[i + 2] * 81.93;
          } else if ( occupRows[i] == "S-2 Storage, low hazard" ) {
            valuation += occupRows[i + 2] * 80.93;
          } else if ( occupRows[i] == "U Utility, miscellaneous" ) {
            valuation += occupRows[i + 2] * 62.58;
          }
        } else if ( occupRows[i + 1] == "VA" ) {
          if ( occupRows[i] == "A-1 Assembly, theaters, with stage" ) {
            valuation += occupRows[i + 2] * 176.18;
          } else if ( occupRows[i] == "A-1 Assembly, theaters, without stage" ) {
            valuation += occupRows[i + 2] * 157.38;
          } else if ( occupRows[i] == "A-2 Assembly, nightclubs" ) {
            valuation += occupRows[i + 2] * 137.58;
          } else if ( occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            valuation += occupRows[i + 2] * 135.58;
          } else if ( occupRows[i] == "A-3 Assembly, churches" ) {
            valuation += occupRows[i + 2] * 159.54;
          } else if ( occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums" ) {
            valuation += occupRows[i + 2] * 123.72;
          } else if ( occupRows[i] == "A-4 Assembly, arenas" ) {
            valuation += occupRows[i + 2] * 155.38;
          } else if ( occupRows[i] == "B Business" ) {
            valuation += occupRows[i + 2] * 128.34;
          } else if ( occupRows[i] == "E Educational" ) {
            valuation += occupRows[i + 2] * 140.46;
          } else if ( occupRows[i] == "F-1 Factory and industrial, moderate hazard" ) {
            valuation += occupRows[i + 2] * 70.57;
          } else if ( occupRows[i] == "F-2 Factory and industrial, low hazard" ) {
            valuation += occupRows[i + 2] * 70.57;
          } else if ( occupRows[i] == "H-1 High Hazard, explosives" ) {
            valuation += occupRows[i + 2] * 64.84;
          } else if ( occupRows[i] == "H234 High Hazard" ) {
            valuation += occupRows[i + 2] * 64.84;
          } else if ( occupRows[i] == "H-5 HPM" ) {
            valuation += occupRows[i + 2] * 128.34;
          } else if ( occupRows[i] == "I-1 Institutional, supervised environment" ) {
            valuation += occupRows[i + 2] * 133.69;
          } else if ( occupRows[i] == "I-2 Institutional, hospitals" ) {
            valuation += occupRows[i + 2] * 251.09;
          } else if ( occupRows[i] == "I-2 Institutional, nursing homes" ) {
            valuation += occupRows[i + 2] * 159.42;
          } else if ( occupRows[i] == "I-3 Institutional, restrained" ) {
            valuation += occupRows[i + 2] * 154.78;
          } else if ( occupRows[i] == "I-4 Institutional, day care facilities" ) {
            valuation += occupRows[i + 2] * 133.69;
          } else if ( occupRows[i] == "M Mercantile" ) {
            valuation += occupRows[i + 2] * 91.82;
          } else if ( occupRows[i] == "R-1 Residential, hotels" ) {
            valuation += occupRows[i + 2] * 135.49;
          } else if ( occupRows[i] == "R-2 Residential, multiple family" ) {
            valuation += occupRows[i + 2] * 106.66;
          } else if ( occupRows[i] == "R-3 Residential, one- and two-family" ) {
            valuation += occupRows[i + 2] * 119.73;
          } else if ( occupRows[i] == "R-4 Residential, care/assisted living facilities" ) {
            valuation += occupRows[i + 2] * 133.69;
          } else if ( occupRows[i] == "S-1 Storage, moderate hazard" ) {
            valuation += occupRows[i + 2] * 62.84;
          } else if ( occupRows[i] == "S-2 Storage, low hazard" ) {
            valuation += occupRows[i + 2] * 62.84;
          } else if ( occupRows[i] == "U Utility, miscellaneous" ) {
            valuation += occupRows[i + 2] * 46.83;
          }
        } else if ( occupRows[i + 1] == "VB" ) {
          if ( occupRows[i] == "A-1 Assembly, theaters, with stage" ) {
            valuation += occupRows[i + 2] * 169.73;
          } else if ( occupRows[i] == "A-1 Assembly, theaters, without stage" ) {
            valuation += occupRows[i + 2] * 150.92;
          } else if ( occupRows[i] == "A-2 Assembly, nightclubs" ) {
            valuation += occupRows[i + 2] * 132.93;
          } else if ( occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls" ) {
            valuation += occupRows[i + 2] * 131.93;
          } else if ( occupRows[i] == "A-3 Assembly, churches" ) {
            valuation += occupRows[i + 2] * 153.09;
          } else if ( occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums" ) {
            valuation += occupRows[i + 2] * 118.27;
          } else if ( occupRows[i] == "A-4 Assembly, arenas" ) {
            valuation += occupRows[i + 2] * 149.92;
          } else if ( occupRows[i] == "B Business" ) {
            valuation += occupRows[i + 2] * 122.72;
          } else if ( occupRows[i] == "E Educational" ) {
            valuation += occupRows[i + 2] * 136.18;
          } else if ( occupRows[i] == "F-1 Factory and industrial, moderate hazard" ) {
            valuation += occupRows[i + 2] * 66.08;
          } else if ( occupRows[i] == "F-2 Factory and industrial, low hazard" ) {
            valuation += occupRows[i + 2] * 65.08;
          } else if ( occupRows[i] == "H-1 High Hazard, explosives" ) {
            valuation = 0;
          } else if ( occupRows[i] == "H234 High Hazard" ) {
            valuation += occupRows[i + 2] * 59.35;
          } else if ( occupRows[i] == "H-5 HPM" ) {
            valuation += occupRows[i + 2] * 122.72;
          } else if ( occupRows[i] == "I-1 Institutional, supervised environment" ) {
            valuation += occupRows[i + 2] * 129.43;
          } else if ( occupRows[i] == "I-2 Institutional, hospitals" ) {
            valuation = 0;
          } else if ( occupRows[i] == "I-2 Institutional, nursing homes" ) {
            valuation = 0;
          } else if ( occupRows[i] == "I-3 Institutional, restrained" ) {
            valuation += occupRows[i + 2] * 147.16;
          } else if ( occupRows[i] == "I-4 Institutional, day care facilities" ) {
            valuation += occupRows[i + 2] * 129.43;
          } else if ( occupRows[i] == "M Mercantile" ) {
            valuation += occupRows[i + 2] * 88.16;
          } else if ( occupRows[i] == "R-1 Residential, hotels" ) {
            valuation += occupRows[i + 2] * 131.23;
          } else if ( occupRows[i] == "R-2 Residential, multiple family" ) {
            valuation += occupRows[i + 2] * 102.41;
          } else if ( occupRows[i] == "R-3 Residential, one- and two-family" ) {
            valuation += occupRows[i + 2] * 112.65;
          } else if ( occupRows[i] == "R-4 Residential, care/assisted living facilities" ) {
            valuation += occupRows[i + 2] * 129.43;
          } else if ( occupRows[i] == "S-1 Storage, moderate hazard" ) {
            valuation += occupRows[i + 2] * 58.35;
          } else if ( occupRows[i] == "S-2 Storage, low hazard" ) {
            valuation += occupRows[i + 2] * 57.35;
          } else if ( occupRows[i] == "U Utility, miscellaneous" ) {
            valuation += occupRows[i + 2] * 44.63;
          }
        }
      }
      if ( $('#basementArea').val() ) {
        valuation += $('#basementArea').val() * 15;
      }
      if ( $('#garageArea').val() ) {
        valuation += $('#garageArea').val() * 44.63;
      }
      if ( $('#otherArea').val() ) {
        valuation += $('#otherArea').val() * 112.65;
      }
      if ( $('#carportArea').val() ) {
        valuation += $('#carportArea').val() * 33.47;
      }
      if ( $('#deckArea').val() ) {
        valuation += $('#deckArea').val() * 29.9;
      }
      if ( $('#premanArea').val() ) {
        valuation += parseInt($('#premanArea').val()) * 56.33;
      }
      if ( $('#remodelCost').val() ) {
        valuation += parseInt($('#remodelCost').val());
      }
      if ( $('#livingSpaceArea').val() >= 2000 ) {
        valuation += $('#livingSpaceArea').val() * 140.81;
      } else if ( $('#livingSpaceArea').val() < 2000 && $('#livingSpaceArea').val() > 0 ) {
        valuation += $('#livingSpaceArea').val() * 112.65;
      }

      // Begin final calc
      if ( valuation <= 500 ) {
        permitFee = 39.04;
      } else if ( valuation > 500 && valuation <= 2000 ) {
        permitFee = ( 39.04 + ( Math.ceil((valuation - 500) / 100) * 4.88) );
      } else if ( valuation > 2000 && valuation <= 25000 ) {
        permitFee = ( 112.24 + ( Math.ceil((valuation - 2000) / 1000) * 22.50) );
      } else if ( valuation > 25000 && valuation <= 50000 ) {
        permitFee = ( 629.74 + ( Math.ceil((valuation - 25000) / 1000) * 16.39) );
      } else if ( valuation > 50000 && valuation <= 100000 ) {
        permitFee = ( 1039.49 + ( Math.ceil((valuation - 50000) / 1000) * 11.26) );
      } else if ( valuation > 100000 && valuation <= 500000 ) {
        permitFee = ( 1602.49 + ( Math.ceil((valuation - 100000) / 1000) * 9.04) );
      } else if ( valuation > 500000 && valuation <= 1000000 ) {
        permitFee = ( 5218.49 + ( Math.ceil((valuation - 500000) / 1000) * 7.61) );
      } else if ( valuation > 1000000 ) {
        permitFee = ( 9023.49 + ( Math.ceil((valuation - 1000000) / 1000) * 5.85) );
      }
      if (projectType == "RN") {
        if ( $('#structureType').val() == "a single family home" ) {
          planRevFee = 286.24;
        } else if ( $('#structureType').val() == "a duplex" ) {
          planRevFee = 364.30;
        } else {
          planRevFee = ( permitFee * .22 );
        }
      } else if (projectType == "RA" || projectType == "RR" || projectType == "RB") {
        planRevFee = ( permitFee * .22 );
      } else if (projectType == "CN" || projectType == "CA" || projectType == "CR" || projectType == "CB") {
        planRevFee = ( permitFee * .65 );
      }
      if ( planRevFee < 40.33 ) {
        planRevFee = 40.33;
      }
      esaFee = (permitFee + planRevFee) * .07;
      smifFee = permitFee * .1;
      if ( numUnits > 0 ) {
        buildingFee += 2 * (numUnits - 1);
      }

      total = permitFee + esaFee + smifFee + buildingFee + planRevFee;

      $('.description').addClass('open').addClass('disclaimer').html("<div class=\"disclaimer\">This fee estimator is intended for informational purposes only, and currently available for limited permit types.  Please note, complete identification of all required permits and final fee calculations will be completed during the processing of a permit application.</div>");
      $('#permit .money').html("$" + permitFee.toFixed(2));
      $('#esa .money').html("$" + esaFee.toFixed(2));
      $('#smif .money').html("$" + smifFee.toFixed(2));
      $('#bld .money').html("$" + buildingFee.toFixed(2));
      $('#review .money').html("+ $" + planRevFee.toFixed(2));
      $('#total .money').html("$" + total.toFixed(2));
      $('#pg2, .tab-links li').removeClass('active');
      $('#pg3, #pg3-pointer').addClass('active');
    } else {
      showError($(this), $('#pg2 select, #pg2 input'));
    }
  });
  $('#pg2 .back').click(function () {
    occupRows = [];
    numUnits = 0;
    readyForCalc = false;
    $('.description').addClass('open');
    $('#pg2, .tab-links li').removeClass('active');
    $('#pg1, #pg1-pointer').addClass('active');
    $('#pg2 .question-content').html("<div id='q1'></div><div id='q2'></div><div id='q3'></div><div id='q4'></div><div id='q5'></div><div id='q6'></div><div id='q7'></div>");
  });
  $('#pg3 .next').click(function () {
    occupRows = [];
    numUnits = 0;
    valuation = 0;
    permitFee = 0;
    esaFee = 0;
    smifFee = 0;
    buildingFee = 4.5;
    planRevFee = 0;
    total = 0;
    readyForCalc = false;
    $('.description').addClass('open').removeClass('disclaimer').html("<p><b>This fee estimator is intended for informational purposes only</b> and will help you estimate what your building permit fee will be.</p><p>Click on the <span class=\"underline\">underlined blank spaces</span> in the sentences below to select from a dropdown menu of choices or enter a number value based off of what fits in the sentence.</p><p>Hover over <span class=\"green\">green</span> question marks to get more information about the item next to the icon.</p><p>If you need help, click on the <span class=\"green\">\"Technical Issues\"</span> button at the bottom of the page and describe the problem above the dotted line.</p>");
    $('#pg3, .tab-links li').removeClass('active');
    $('#pg1, #pg1-pointer').addClass('active');
    $('#pg2 .question-content').html("<div id='q1'></div><div id='q2'></div><div id='q3'></div><div id='q4'></div><div id='q5'></div><div id='q6'></div><div id='q7'></div>");
  });
  $('#pg3 .back').click(function () {
    valuation = 0;
    esaFee = 0;
    smifFee = 0;
    buildingFee = 4.5;
    planRevFee = 0;
    total = 0;
    readyForCalc = false;
    $('.description').removeClass('open').removeClass('disclaimer').html("<p><b>This fee estimator is intended for informational purposes only</b> and will help you estimate what your building permit fee will be.</p><p>Click on the <span class=\"underline\">underlined blank spaces</span> in the sentences below to select from a dropdown menu of choices or enter a number value based off of what fits in the sentence.</p><p>Hover over <span class=\"green\">green</span> question marks to get more information about the item next to the icon.</p><p>If you need help, click on the <span class=\"green\">\"Technical Issues\"</span> button at the bottom of the page and describe the problem above the dotted line.</p>");
    $('#pg3, .tab-links li').removeClass('active');
    $('#pg2, #pg2-pointer').addClass('active');
  });
  $('#feedback').click(function() {
    var feedback = "mailto:tacomapermits@cityoftacoma.org?subject=Problems using the fee estimator&body=%0D%0A%0D%0A----- Leave your comments above. Do not edit beneath this line -----%0D%0A%0D%0AProject Type 1: " + $('#project-type-1').val() + "%0D%0AProject Type 2: " + $('#project-type-2').val();
    if ( projectType == "RN" || projectType == "RA") {
      feedback += "%0D%0AStructure Type: " + $('#structureType').val();
      if ($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
        feedback += "%0D%0ALiving space: " + $('#livingSpaceArea').val() + "%0D%0AGarage: " + $('#garageArea').val() + "%0D%0APreman: " + $('#premanArea').val() + "%0D%0ABasement: " + $('#basementArea').val() + "%0D%0ADeck: " + $('#deckArea').val();
      } else if ($('#structureType').val() == "an accessory structure") {
        if ( $('input[name="garage"]').is(':checked')) {
          feedback += "%0D%0AGarage: " + $('#garageArea').val();
        }
        if ( $('input[name="carport"]').is(':checked')) {
          feedback += "%0D%0ACarport: " + $('#carportArea').val();
        }
        if ( $('input[name="other"]').is(':checked')) {
          feedback += "%0D%0AOther: " + $('#otherArea').val();
        }
      }
    } else if ( projectType == "RR" || projectType == "CR" ) {
      feedback += "%0D%0ARemodel cost: " + $('#remodelCost').val();
    } else if ( projectType == "CN" || projectType == "CA" ) {
      if (occupRows.length == 0) {
        occupRows.push($('#occup-cat').val(), $('#constructionType').val(), $('#cnArea').val());
      }
      for ( i = 0; i < occupRows.length; i += 3 ) {
        feedback += "%0D%0AOccupancy #" + ((i + 3) / 3) + ": " + occupRows[i] + "%0D%0AConstruction type: " + occupRows[i + 1] + "%0D%0ASquare Feet: " + occupRows[i + 2];
      }
      if (numUnits > 0) {
        feedback += "%0D%0AUnits: " + numUnits;
      }
    } else if (projectType == "RB") {
      feedback += "%0D%0AStructure Type: " + $('#structureType').val();
      if ($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
        feedback += "%0D%0ALiving space: " + $('#livingSpaceArea').val() + "%0D%0AGarage: " + $('#garageArea').val() + "%0D%0APreman: " + $('#premanArea').val() + "%0D%0ABasement: " + $('#basementArea').val() + "%0D%0ADeck: " + $('#deckArea').val();
      } else if ($('#structureType').val() == "an accessory structure") {
        if ( $('input[name="garage"]').is(':checked')) {
          feedback += "%0D%0AGarage: " + $('#garageArea').val();
        }
        if ( $('input[name="carport"]').is(':checked')) {
          feedback += "%0D%0ACarport: " + $('#carportArea').val();
        }
        if ( $('input[name="other"]').is(':checked')) {
          feedback += "%0D%0AOther: " + $('#otherArea').val();
        }
      }
        feedback += "%0D%0ARemodel cost: " + $('#remodelCost').val();
    } else if (projectType == "CB") {
      if (occupRows.length == 0) {
        occupRows.push($('#occup-cat').val(), $('#cnArea').val());
      }
      for ( i = 0; i < occupRows.length; i += 3 ) {
        feedback += "%0D%0AOccupancy #" + ((i + 3) / 3) + ": " + occupRows[i] + "%0D%0AConstruction type: " + occupRows[i + 1] + "%0D%0ASquare Feet: " + occupRows[i + 2];
      }
      if (numUnits > 0) {
        feedback += "%0D%0AUnits: " + numUnits;
      }
      feedback += "%0D%0ARemodel cost: " + $('#remodelCost').val();
    }
    feedback += "%0D%0A%0D%0AApp Version: v1.0";
    var w = window.open(feedback);
    setTimeout(function () {
      w.close();
    }, 100);
  });
  $('#expand').click(function () {
    $('.fee-details').addClass('open');
    $(this).hide();
    $('#collapse').show();
  });
  $('#collapse').click(function () {
    $('.fee-details').removeClass('open');
    $(this).hide();
    $('#expand').show();
  });
  $('.description-expand').click(function(){
    $('.description').toggleClass('open');
  });
  $('#fe').keypress(function(e) {
    if(e.which < 46 || e.which > 59) {
      e.preventDefault();
    }
    if(e.which == 46 && $(this).val().indexOf('.') != -1) {
      e.preventDefault();
    }
  });
  $('#fe button').click(function(e){
    e.preventDefault();
  });
  function showError(button, boxes) {
    button.addClass('shake');
    setTimeout(function() {
      button.removeClass('shake');
    }, 500);
    boxes.addClass('look-here');
    setTimeout(function() {
      boxes.removeClass('look-here');
    }, 500);
  }
});
