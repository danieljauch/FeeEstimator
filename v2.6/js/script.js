var projectType1, projectType2, projectType, fixtures, daysForBarricade, rowRestoration, connectionType, dischargePoint, structureType;
var occupRows = [];
var useRows = [];
var fixtureRows = [];
var permits = [];
var currentPermit = "";
var readyForLastPage = false;
var readyforNextPermit = false;
var valuation = 0;
var total = 0;
var grandTotal = 0;
var planRevFee = 0;
var permitFee = 0;
var esaFee = 0;
var smifFee = 0;
var stateFee = 0;
var numUnits = 0;
var currentTable = 0;
var currentColumn = 0;
var acres = 0;
var lots = 0;
var shoreval = 0;
var basicPage = "<h3></h3><form class=\"question-content\"><div class=\"question q1\"></div><div class=\"question q2\"></div><div class=\"question q3\"></div><div class=\"question q4\"></div><div class=\"question q5\"></div><div class=\"question q6\"></div><div class=\"question q7\"></div><div class=\"question q8\"></div></form><button class=\"btn back\"><i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i><span> Back</span></button><button class=\"btn next\"><span>Next </span><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></button>";
var projectTypeText = "I'm working on a <select id=\"project-type-1\"><option></option><option>residential</option><option>commercial</option></select><span class=\"tooltip-wrapper mid-page\"><i class=\"fa fa-question tooltip-pointer\" aria-hidden=\"true\"></i><div class=\"tooltip\"><div><b>Residential:</b> Single-Family, Duplex, and Townhomes 1-2 Units</div><div><b>Commercial:</b> Triplex, Multi-Family, Mixed-Use, Industrial, and Non-Residential Buildings</div></div></span> project that is <select id=\"project-type-2\"><option></option><option>a new building</option><option>a remodel on an existing building</option><option>adding to an existing building</option><option>both a remodel and an addition</option></select><span class=\"tooltip-wrapper mid-page\"><i class=\"fa fa-question tooltip-pointer\" aria-hidden=\"true\"></i><div class=\"tooltip\"><div><b>New:</b> Construction of an entirely new building or structure</div><div><b>Remodel:</b> Change of the interior characteristics of an existing building and/or space</div><div><b>Addition:</b> Extension or increase in floor area or height of a existing structure</div></div></span>.";
var structureTypeText = "<p>This project is <select id=\"structureType\"><option></option><option>a single family home</option><option>a duplex</option><option>an accessory structure</option></select>.</p>";
var livingSpaceText = "<p>The new living space added will total <input type=\"number\" placeholder=\"0\" min=\"0\" step=\"50\" id=\"livingSpaceArea\"> square feet.</p><p>The new attached garage area will total <input type=\"number\" placeholder=\"0\" min=\"0\" step=\"50\" id=\"garageArea\"> square feet.</p><p>The new premanufactured housing area will total <input type=\"number\" placeholder=\"0\" min=\"0\" step=\"50\" id=\"premanArea\"> square feet.</p><p>The new unfinished basement area will total <input type=\"number\" placeholder=\"0\" min=\"0\" step=\"50\" id=\"basementArea\"> square feet.</p><p>The new deck and / or porch area will total <input type=\"number\" placeholder=\"0\" min=\"0\" step=\"50\" id=\"deckArea\"> square feet.</p>";
var accessoryText = "<p>I would describe my accessory building(s) as...</p><p><input type=\"checkbox\" name=\"garage\" id=\"garageCheck\"> <label for=\"garageCheck\">A garage</label></p><p><input type=\"checkbox\" name=\"carport\" id=\"carportCheck\"> <label for=\"carportCheck\">A carport</label></p><p><input type=\"checkbox\" name=\"other\" id=\"otherCheck\"> <label for=\"otherCheck\">Some other kind of structure</label></p>";
var garageAreaText = "<p>The new detached garage area will total <input type=\"number\" placeholder=\"0\" min=\"0\" step=\"50\" id=\"garageArea\"> square feet.</p>";
var carportAreaText = "<p>The new carport structure area will total <input type=\"number\" placeholder=\"0\" min=\"0\" step=\"50\" id=\"carportArea\"> square feet.</p>";
var otherAreaText = "<p>The new other structure area will total <input type=\"number\" placeholder=\"0\" min=\"0\" step=\"50\" id=\"otherArea\"> square feet.</p>";
var occupCatText = "<p>This building has <select id=\"occupCat\"><option></option><option>A-1 Assembly, theaters, with stage</option><option>A-1 Assembly, theaters, without stage</option><option>A-2 Assembly, nightclubs</option><option>A-2 Assembly, restaurants, bars, banquet halls</option><option>A-3 Assembly, churches</option><option>A-3 Assembly, general, community halls, libraries, museums</option><option>A-4 Assembly, arenas</option><option>B Business</option><option>E Educational</option><option>F-1 Factory and industrial, moderate hazard</option><option>F-2 Factory and industrial, low hazard</option><option>H-1 High Hazard, explosives</option><option>H234 High Hazard</option><option>H-5 HPM</option><option>I-1 Institutional, supervised environment</option><option>I-2 Institutional, hospitals</option><option>I-2 Institutional, nursing homes</option><option>I-3 Institutional, restrained</option><option>I-4 Institutional, day care facilities</option><option>M Mercantile</option><option>R-1 Residential, hotels</option><option>R-2 Residential, multiple family</option><option>R-3 Residential, one- and two-family</option><option>R-4 Residential, care/assisted living facilities</option><option>S-1 Storage, moderate hazard</option><option>S-2 Storage, low hazard</option><option>U Utility, miscellaneous</option></select> occupancy.</p>";
var remodelCostText = "<p>The total value of my building costs, materials, and labor for my remodel (separate from any additions) is $ <input type=\"number\" placeholder=\"-.--\" id=\"remodelCost\" min=\"0\" step=\"50\">.</p>";
var unitsText = "There are <input type=\"number\" placeholder=\"0\" id=\"units\" min=\"0\" step=\"1\"> units in this occupancy.";
var cnAreaText = "<p>This total area for this type of occupancy is <input id=\"cnArea\" type=\"number\" placeholder=\"0\" min=\"0\" step=\"50\"> square feet.</p>";
var constructionTypeText = "<p>The type of construction for this project is <select id=\"constructionType\"><option></option><option>IA</option><option>IB</option><option>IIA</option><option>IIB</option><option>IIIA</option><option>IIIB</option><option>IV</option><option>VA</option><option>VB</option></select>.</p><p class=\"disclaimer\">If you aren't sure, use VB</p>";
var occupAddText = "<span class=\"btn\" id=\"occupAdd\">There are more occupancy types</span>";
var plmFixtureText = "<p>There are <input class=\"fixtureQuantity\" type=\"number\" placeholder=\"0\" min=\"0\"> fixtures being worked on.</p><p>Fixtures may include water closets, basins, bathtubs, showers, sinks, laundry trays, water heaters, dishwashers, wash machines, urinals, backflow preventers, floor drains, drinking fountains, pressure reducing valves, sump pumps, floor sinks, mop sinks, grease traps, or others.</p>";
var barricadeIfText = "<p>I <select class=\"barricadeIf\"><option></option><option>will</option><option>will not</option></select> need a barricade for this work.</p>";
var barricadeDaysText = "<p>I will be setting up a barricade for <input class=\"daysForBarricade\" type=\"number\" placeholder=\"0\" min=\"0\" max=\"31\"> days for the right-of-way work.</p>";
var rowRestorationText = "<p>This project <select class=\"rowRestoration\"><option></option><option>will</option><option>will not</option></select> require right-of-way work on a public sidewalk, street, or pavement around the property.</p>";
var sewerConnectionTypeText = "<p>I'll be <select class=\"connectionType\"><option></option><option>replacing</option><option>adding</option><option>repairing</option></select> a side sewer.</p>";
var waterConnectionTypeText = "<p>I'll be <select class=\"connectionType\"><option></option><option>replacing</option><option>adding</option><option>repairing</option></select> a water service line.</p>";
var dischargePointText = "<p>The discharge point for the storm connection is <select class=\"dischargePoint\"><option></option><option>a catch basin</option><option>a manhole</option><option>an on-site system</option><option>a curb drain</option></select>.</p>"
var cutAndFillText = "<p>The total \"cut-and-fill\" grading area is <input type=\"number\" id=\"cutAndFill\" min=\"0\" step=\"50\"> cubic yards.</p>";
var clearingAreaText = "<p>The total clearing area is <input type=\"number\" id=\"clearingArea\" min=\"0\" step=\"50\"> square feet.</p>";
var pavedAreaText = "<p>The total paved surface area is <input type=\"number\" id=\"pavedArea\" min=\"0\" step=\"50\"> square feet.</p>";
var signCostText = "<p>The total value of my building costs, materials, and labor for my sign is $ <input type=\"number\" placeholder=\"-.--\" id=\"signCost\" min=\"0\" step=\"50\">.</p>";
var demoTypeText = "<p>This structure being demolished is a <select id=\"demoType\"><option></option><option>residential</option><option>commercial</option></select> structure.</p>"
var demoAreaText = "<p>The total area inside the building is <input type=\"number\" id=\"demoArea\" min=\"0\" step=\"50\"> square feet.</p>"
var demoCostText = "<p>The total value of my building costs, materials, and labor for my demolition is $ <input type=\"number\" placeholder=\"-.--\" id=\"demoCost\" min=\"0\" step=\"50\">.</p>";
var luPermitTypeText = "<p>I'm looking for a(n) <select id=\"luPermitType\"><option></option><option>accessory dwelling unit</option><option>conditional use</option><option>critical areas</option><option>environmental review</option><option>extension of permit</option><option>information request</option><option>major modification of permit</option><option>plats / short plats / boundary line adjustments</option><option>shoreline</option><option>site approval</option><option>site rezone</option><option>temporary homeless camp</option><option>variance</option></select> land use permit.</p>";
var accDwellingSubtypeText = "<select id=\"luPermitSubtype\"><option></option><option>attached</option><option>detached</option></select>";
var condUseSubtypeText = "<select id=\"luPermitSubtype\"><option></option><option>general</option><option>day care centers, 13-49 children</option><option>duplex, triplex, townhome in R-2SRD and HMR-SRD districts</option><option>duplex, triplex, townhome in NRX district</option><option>historic structure re-use</option><option>large scale retail</option><option>special needs housing</option><option>use in south Tacoma M/IC overlay district</option></select>";
var critAreaSubtypeText = "<select id=\"luPermitSubtype\"><option></option><option>activities allowed with staff review</option><option>development permit</option><option>minor development permit</option><option>verification</option></select>";
var envRevSubtypeText = "<select id=\"luPermitSubtype\"><option></option><option>addendum EIS</option><option>buildings over 20,000 square feet</option><option>environmental impact statement</option><option>grading permits > 500 cy and residential buildings of > 20 units and 6,001 - 10,000 square feet</option><option>parking lots > 40 stalls, signs, residential buildings > 20 units and < 6,000 square feet, and misc. actions</option><option>residential buildings > 20 units and 10,001 - 20,000 square feet or commercial buildings 12,000 - 20,000 square feet</option><option>SEPA with a discretionary land use permit</option><option>supplemental EIS</option></select>";
var infReqSubtypeText = "<select id=\"luPermitSubtype\"><option></option><option>determination or interpretation by director</option><option>uses not specifically classified</option><option>zoning verification letter</option></select>";
var majModSubtypeText = "<select id=\"luPermitSubtype\"><option></option><option>all others</option><option>conditional use permit</option><option>single-family residential</option></select>";
var platsSubtypeText = "<select id=\"luPermitSubtype\"><option></option><option>binding site plan approval</option><option>boundary line adjustment</option><option>final short or long plat</option><option>preliminary plat</option><option>segregation / combination</option></select>";
var shoreSubtypeText = "<select id=\"luPermitSubtype\"><option></option><option>single-family residential</option><option>exemption</option><option>other than single-family</option><option>revisions - single-family</option><option>revisions - other than single-family</option></select>";
var siteRezSubtypeText = "<select id=\"luPermitSubtype\"><option></option><option>all other districts</option><option>single-family dwelling district (R-1, R-2, R-2SRD)</option><option>two-family dwelling district</option></select>";
var varSubtypeText = "<select id=\"luPermitSubtype\"><option></option><option>accessory building height</option><option>design</option><option>development regulations (other than single-family residential)</option><option>development regulations (single-family residential)</option><option>minor variance (other than single-family residential)</option><option>minor variance (single-family residential)</option><option>parking</option><option>signs</option><option>view-sensitive overlay district - main building height</option></select>";
var plats3rdQuestText = "<p>There are <input type=\"number\" id=\"thirdQuest\" min=\"2\" step=\"1\"> lots in this plat.</p>"
var shore3rdQuestText = "<p>The total valuation of the shoreline work is <input type=\"number\" placeholder=\"-.--\" id=\"thirdQuest\" min=\"0\" step=\"100000\">.</p>"
var luAddText = "<span class=\"btn\" id=\"luAdd\">I'll need another permit</span>";
var pg12instructions = "<p><b>This fee estimator is intended for informational purposes only</b> and will help you estimate what your building permit fee will be.</p><p>Click on the <span class=\"underline\">underlined blank spaces</span> in the sentences below to select from a dropdown menu of choices or enter a number value based off of what fits in the sentence.</p><p>Hover over <span class=\"green\">green</span> question marks to get more information about the item next to the icon.</p><p>If you need help, click on the <span class=\"green\">Technical Issues</span> button at the bottom of the page and describe the problem above the dotted line.</p>";
var pg3disclaimer = "<div class=\"disclaimer\">This fee estimator is intended for informational purposes only, and currently available for limited permit types.  Please note, complete identification of all required permits and final fee calculations will be completed during the processing of a permit application.</div>";
var permitFeeDetails = "<div class=\"fee-sub-items\"><p class=\"base\">Base permit fee:<span class=\"money\"></span></p><span class=\"tooltip-wrapper last-page\"><i class=\"fa fa-question tooltip-pointer\" aria-hidden=\"true\"></i><div class=\"tooltip\"><div>The <b>base permit fee</b> includes the fees associated with the fields you filled out on the last page as well as the <b>Integrated Permit Management System (IPMS)</b> fees which helps fund the permit systems used city- and state-wide.</div></div></span><p class=\"esa\">ESA fee:<span class=\"money\"></span></p><span class=\"tooltip-wrapper last-page\"><i class=\"fa fa-question tooltip-pointer\" aria-hidden=\"true\"></i><div class=\"tooltip\"><div>The <b>Endangered Species Act (ESA)</b> uses these funds to make sure that any endangered species can be sustained and the funding exists at the federal level.</div></div></span><p class=\"smif\">SMIF fee:<span class=\"money\"></span></p><span class=\"tooltip-wrapper last-page\"><i class=\"fa fa-question tooltip-pointer\" aria-hidden=\"true\"></i><div class=\"tooltip\"><div>The <b>Strong Motion Instrumentation Fees (SMIF)</b> are what funds strong-motion instruments to collect geologic data throughout the city.</div></div></span><p class=\"state\">State building fee:<span class=\"money\"></span></p><span class=\"tooltip-wrapper last-page\"><i class=\"fa fa-question tooltip-pointer\" aria-hidden=\"true\"></i><div class=\"tooltip\"><div>The <b>state building fee</b> is collected to help fund the building code council at the state level.</div></div></span><p class=\"review\">Plan review fee:<span class=\"money\"></span></p><span class=\"tooltip-wrapper last-page\"><i class=\"fa fa-question tooltip-pointer\" aria-hidden=\"true\"></i><div class=\"tooltip\"><div>The <b>plan review fee</b> covers the expenses for a building planner to go over the permit and approve it.</div></div></span></div>";
var feedback = "";
var $doc = $(document);
$doc.ready(function() {
  $('#fe').keypress(function(e) {
    if(e.which < 46 || e.which > 59) {
      e.preventDefault();
    }
    if(e.which == 46 && $(this).val().indexOf('.') != -1) {
      e.preventDefault();
    }
  });
  $('#fe button').click(function(e) {
    e.preventDefault();
  });
});
$doc.on('click', '#pgfirst .next', function() {
  permits = [];
  if($('#bldCheck').is(':checked')) {
    permits.push("bld");
  }
  if($('#plmCheck').is(':checked')) {
    permits.push("plm");
  }
  if($('#sewerCheck').is(':checked')) {
    permits.push("sewer");
  }
  if($('#wtrCheck').is(':checked')) {
    permits.push("wtr");
  }
  if($('#stormCheck').is(':checked')) {
    permits.push("storm");
  }
  if($('#sitedevCheck').is(':checked')) {
    permits.push("sitedev");
  }
  if($('#signCheck').is(':checked')) {
    permits.push("sign");
  }
  if($('#demoCheck').is(':checked')) {
    permits.push("demo");
  }
  if($('#landCheck').is(':checked')) {
    permits.push("land");
  }
  if($('input[type="checkbox"]').is(':checked')) {
    $('.description').removeClass('open');
    $('#pgfirst, .tab-links li').removeClass('active');
    $('#pgfirst-pointer').addClass('post');
    $('#details-num').text(" (1/" + permits.length + ")");
    for (var i in permits) {
      if (i == 0) {
        activePermit = permits[i];
      }
      if (permits[i] == "bld") {
        $('<article id=\"pgbld\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgbld').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgbld .question').hide();
      } else if (permits[i] == "plm") {
        $('<article id=\"pgplm\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgplm').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgplm .question').hide();
      } else if (permits[i] == "sewer") {
        $('<article id=\"pgsewer\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgsewer').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgsewer .question').hide();
      } else if (permits[i] == "wtr") {
        $('<article id=\"pgwtr\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgwtr').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgwtr .question').hide();
      } else if (permits[i] == "storm") {
        $('<article id=\"pgstorm\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgstorm').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgstorm .question').hide();
      } else if (permits[i] == "sitedev") {
        $('<article id=\"pgsitedev\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgsitedev').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgsitedev .question').hide();
      } else if (permits[i] == "sign") {
        $('<article id=\"pgsign\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgsign').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgsign .question').hide();
      } else if (permits[i] == "demo") {
        $('<article id=\"pgdemo\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgdemo').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgdemo .question').hide();
      } else if (permits[i] == "land") {
        $('<article id=\"pgland\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgland').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgland .question').hide();
      }
    }
    if (activePermit == "bld") {
      $('#pgbld').addClass('active');
      bldPermit();
    } else if (activePermit == "plm") {
      $('#pgplm').addClass('active');
      plmPermit();
    } else if (activePermit == "sewer") {
      $('#pgsewer').addClass('active');
      sewerPermit();
    } else if (activePermit == "wtr") {
      $('#pgwtr').addClass('active');
      wtrPermit();
    } else if (activePermit == "storm") {
      $('#pgstorm').addClass('active');
      stormPermit();
    } else if (activePermit == "sitedev") {
      $('#pgsitedev').addClass('active');
      sitedevPermit();
    } else if (activePermit == "sign") {
      $('#pgsign').addClass('active');
      signPermit();
    } else if (activePermit == "demo") {
      $('#pgdemo').addClass('active');
      demoPermit();
    } else if (activePermit == "land") {
      $('#pgland').addClass('active');
      landPermit();
    }
  } else {
    showError($(this), $('#pgfirst input'));
  }
});
$doc.on('click', '#pgbld .next', function() {
  readyforNextPermit = false;
  if(projectType == "RN" || projectType == "RA") {
    if ($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
      $.each($('#pgbld .q3 input'), function() {
        if ($(this).val()) {
          readyforNextPermit = true;
        }
      });
    } else if ($('#structureType').val() == "an accessory structure") {
      if($('#garageCheck').is(':checked') && $('#garageArea').val() > 0) {
        readyforNextPermit = true;
      }
      if($('#carportCheck').is(':checked') && $('#carportArea').val() > 0) {
        readyforNextPermit = true;
      }
      if($('#otherCheck').is(':checked') && $('#otherArea').val() > 0) {
        readyforNextPermit = true;
      }
    }
    if (readyforNextPermit) {
      structureType = $('#structureType').val();
      livingSpaceArea = $('#livingSpaceArea').val();
      garageArea = $('#garageArea').val();
      premanArea = $('#premanArea').val();
      basementArea = $('#basementArea').val();
      deckArea = $('#deckArea').val();
    } else {
      showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
    }
  } else if(projectType == "RR" || projectType == "CR") {
    if ($('#remodelCost').val()) {
      readyforNextPermit = true;
    } else {
      showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
    }
    if (readyforNextPermit) {
      remodelCost = $('#remodelCost').val();
    }
  } else if(projectType == "CN" || projectType == "CA") {
    if($('#pgbld input, #pgbld select').val()) {
      numUnits += parseInt($('#units').val());
      if(occupRows.length > 0) {
        if($('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
          occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
        }
        readyforNextPermit = true;
      } else if(occupRows.length == 0 && $('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
        occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
        readyforNextPermit = true;
      }
    } else {
      showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
    }
  } else if(projectType == "RB") {
    if ($('#remodelCost').val()) {
      if ($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
        $.each($('#pgbld .q3 input'), function() {
          if ($(this).val()) {
            readyforNextPermit = true;
          }
        });
      } else if ($('#structureType').val() == "an accessory structure") {
        if($('#garageCheck').is(':checked') && $('#garageArea').val() > 0) {
          readyforNextPermit = true;
        }
        if($('#carportCheck').is(':checked') && $('#carportArea').val() > 0) {
          readyforNextPermit = true;
        }
        if($('#otherCheck').is(':checked') && $('#otherArea').val() > 0) {
          readyforNextPermit = true;
        }
      }
    }
    if (readyforNextPermit) {
      structureType = $('#structureType').val();
      livingSpaceArea = $('#livingSpaceArea').val();
      garageArea = $('#garageArea').val();
      premanArea = $('#premanArea').val();
      basementArea = $('#basementArea').val();
      deckArea = $('#deckArea').val();
    } else {
      showError($('#pgbld .next'), $('#pgbld input, #pgmid select'));
    }
  } else if(projectType == "CB") {
    if($('#pgbld input, #pgbld select').val()) {
      if ($('#remodelCost').val()) {
        numUnits += parseInt($('#units').val());
        if(occupRows.length > 0) {
          if($('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
            occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
          }
          readyforNextPermit = true;
        } else if(occupRows.length == 0 && $('#occupCat').val() != "" && $('#constructionType').val() != "" && cnArea.val() > 0) {
          occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
          readyforNextPermit = true;
        }
      } else {
        showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
      }
    } else {
      showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
    }
  }
  if (readyforNextPermit) {
    if (permits[permits.length - 1] == "bld") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("bld", permits) + 1];
      $('#pgbld').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  }
});
$doc.on('click', '#pgwtr .next', function() {
  if($('#pgwtr .barricadeIf').val() == "will") {
    if($('#pgwtr .daysForBarricade').val() > 0 && $('#pgwtr .connectionType').val()) {
      readyforNextPermit = true;
    } else {
      showError($('#pgwtr .next'), $('#pgwtr .daysForBarricade, #pgwtr .connectionType'));
    }
  } else if ($('#pgwtr .barricadeIf').val() == "will not" && $('#pgwtr .connectionType').val() != "") {
    readyforNextPermit = true;
  } else {
    showError($('#pgwtr .next'), $('#pgwtr .daysForBarricade, #pgwtr .connectionType'));
  }
  if (readyforNextPermit) {
    if (permits[permits.length - 1] == "wtr") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("wtr", permits) + 1];
      $('#pgwtr').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  }
});
$doc.on('click', '#pgplm .next', function() {
  readyforNextPermit = false;
  if ($('#pgplm .fixtureQuantity').val()) {
    readyforNextPermit = true;
  }
  if(readyforNextPermit) {
    if (permits[permits.length - 1] == "plm") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("plm", permits) + 1];
      $('#pgplm').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  } else {
    showError($('#pgplm .next'), $('#pgplm input'));
  }
});
$doc.on('click', '#pgstorm .next', function() {
  if ($('#pgstorm .rowRestoration').val() == "will") {
    if($('#pgstorm .daysForBarricade').val() > 0 && $('#pgstorm .dischargePoint').val()) {
      readyforNextPermit = true;
    }
  } else if ($('#pgstorm .rowRestoration').val() == "will not" && $('#pgstorm .dischargePoint').val() != "") {
    readyforNextPermit = true;
  } else {
    showError($('#pgstorm .next'), $('#pgstorm input'));
  }
  if (readyforNextPermit) {
    if (permits[permits.length - 1] == "storm") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("storm", permits) + 1];
      $('#pgstorm').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  }
});
$doc.on('click', '#pgsewer .next', function() {
  if($('#pgsewer .rowRestoration').val() == "will") {
    if($('#pgsewer .daysForBarricade').val() > 0 && $('#pgsewer .connectionType').val()) {
      readyforNextPermit = true;
    }
  } else if ($('#pgsewer .rowRestoration').val() == "will not" && $('#pgsewer .connectionType').val() != "") {
    readyforNextPermit = true;
  } else {
    showError($('#pgsewer .next'), $('#pgsewer input, #pgsewer select'));
  }
  if (readyforNextPermit) {
    if (permits[permits.length - 1] == "sewer") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("sewer", permits) + 1];
      $('#pgsewer').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  }
});
$doc.on('click', '#pgsitedev .next', function() {
  readyforNextPermit = true;
  $.each($('#pgsitedev input[type="text"]'), function() {
    if($(this).val() == "") {
      readyforNextPermit = false;
    }
  });
  if (readyforNextPermit) {
    if (permits[permits.length - 1] == "sitedev") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("sitedev", permits) + 1];
      $('#pgsitedev').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  } else {
    showError($('#pgsitedev .next'), $('#pgsitedev input'));
  }
});
$doc.on('click', '#pgsign .next', function() {
  if($('#signCost').val()) {
    if (permits[permits.length - 1] == "sign") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("sign", permits) + 1];
      $('#pgsign').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  } else {
    showError($('#pgsign .next'), $('#signCost'));
  }
});
$doc.on('click', '#pgdemo .next', function() {
  if($('#pgdemo input, #pgdemo select').val()) {
    if (permits[permits.length - 1] == "demo") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("demo", permits) + 1];
      $('#pgdemo').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  } else {
    showError($('#pgdemo .next'), $('#pgdemo input, #pgdemo select'));
  }
});
$doc.on('click', '#pgland .next', function() {
  readyforNextPermit = false;
  if ($('#pgland select').val()) {
    if($('#luPermitType').val() == "extension of permit" || $('#luPermitType').val() == "site approval" || $('#luPermitType').val() == "temporary homeless camp") {
      useRows.push($('#luPermitType').val(), "");
      readyforNextPermit = true;
    } else {
      useRows.push($('#luPermitType').val(), $('#luPermitSubtype').val());
      readyforNextPermit = true;
    }
  } else if (useRows.length > 0) {
    readyforNextPermit = true;
  }

  if ($('#pgland select').val() || useRows.length > 0) {
    if ($('#luPermitType').val() != "" && $('#luPermitSubtype').val() != "") {
    }
  }
  if (readyforNextPermit) {
    if (permits[permits.length - 1] == "land") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("land", permits) + 1];
      $('#pgland').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  } else {
    showError($('#pgland .next'), $('#pgland input, #pgland select'));
  }
});
$doc.on('click', '#pgbld .back', function() {
  backPermit("bld");
});
$doc.on('click', '#pgwtr .back', function() {
  backPermit("wtr");
});
$doc.on('click', '#pgplm .back', function() {
  backPermit("plm");
});
$doc.on('click', '#pgstorm .back', function() {
  backPermit("storm");
});
$doc.on('click', '#pgsewer .back', function() {
  backPermit("sewer");
});
$doc.on('click', '#pgsitedev .back', function() {
  backPermit("sitedev");
});
$doc.on('click', '#pgsign .back', function() {
  backPermit("sign");
});
$doc.on('click', '#pgdemo .back', function() {
  backPermit("demo");
});
$doc.on('click', '#pgland .back', function() {
  backPermit("land");
});
$doc.on('click', '#pglast .next', function() {
  readyForLastPage = false;
  $('.description').addClass('open').removeClass('disclaimer').html(pg12instructions);
  $('#pglast, .tab-links li').removeClass('active').removeClass('post');
  $('#pgfirst, #pgfirst-pointer').addClass('active');
  $('#details-num').text("");
});
$doc.on('click', '#pglast .back', function() {
  readyForLastPage = false;
  currentPermit = permits[permits.length - 1];
  $('#pgmid-pointer').removeClass('post');
  $('.description').removeClass('open').removeClass('disclaimer').html(pg12instructions);
  $('#pglast, .tab-links li').removeClass('active');
  $('#pg' + currentPermit + ', #pgmid-pointer').addClass('active');
});
$doc.on('click', '#feedback', function() {
  feedback = "mailto:tacomapermits@cityoftacoma.org?subject=Problems using the fee estimator&body=%0D%0A%0D%0A----- Leave your comments above. Do not edit beneath this line -----%0D%0A%0D%0A";
  for (var i in permits) {
    if (permits[i] == "bld") {
      feedback += "Building Permit: %0D%0A%0D%0AProject Type 1: " + $('#project-type-1').val() + "%0D%0AProject Type 2: " + $('#project-type-2').val();
      if(projectType == "RN" || projectType == "RA") {
        feedback += "%0D%0AStructure Type: " + $('#structureType').val();
        if($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
          feedback += "%0D%0ALiving space: " + livingSpaceArea.val() + "%0D%0AGarage: " + garageArea.val() + "%0D%0APreman: " + premanArea.val() + "%0D%0ABasement: " + basementArea.val() + "%0D%0ADeck: " + deckArea.val();
        } else if($('#structureType').val() == "an accessory structure") {
          if(garageCheck.is(':checked')) {
            feedback += "%0D%0AGarage: " + garageArea.val();
          }
          if(carportCheck.is(':checked')) {
            feedback += "%0D%0ACarport: " + carportArea.val();
          }
          if(otherCheck.is(':checked')) {
            feedback += "%0D%0AOther: " + otherArea.val();
          }
        }
      } else if(projectType == "RR" || projectType == "CR") {
        feedback += "%0D%0ARemodel cost: " + $('#remodelCost').val();
      } else if(projectType == "CN" || projectType == "CA") {
        if(occupRows.length == 0) {
          occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
        }
        for(i = 0; i < occupRows.length; i += 3) {
          feedback += "%0D%0AOccupancy #" + ((i + 3) / 3) + ": " + occupRows[i] + "%0D%0AConstruction type: " + occupRows[i + 1] + "%0D%0ASquare Feet: " + occupRows[i + 2];
        }
        if(numUnits > 0) {
          feedback += "%0D%0AUnits: " + numUnits;
        }
      } else if(projectType == "RB") {
        feedback += "%0D%0AStructure Type: " + $('#structureType').val();
        if($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
          feedback += "%0D%0ALiving space: " + $('#livingSpaceArea').val() + "%0D%0AGarage: " + $('#garageArea').val() + "%0D%0APreman: " + $('#premanArea').val() + "%0D%0ABasement: " + $('#basementArea').val() + "%0D%0ADeck: " + $('#deckArea').val();
        } else if($('#structureType').val() == "an accessory structure") {
          if($('#garageCheck').is(':checked')) {
            feedback += "%0D%0AGarage: " + $('#garageArea').val();
          }
          if($('#carportCheck').is(':checked')) {
            feedback += "%0D%0ACarport: " + $('#carportArea').val();
          }
          if($('#otherCheck').is(':checked')) {
            feedback += "%0D%0AOther: " + $('#otherArea').val();
          }
        }
        feedback += "%0D%0ARemodel cost: " + $('#remodelCost').val();
      } else if(projectType == "CB") {
        if(occupRows.length == 0) {
          occupRows.push($('#occupCat').val(), $('#cnArea').val());
        }
        for(i = 0; i < occupRows.length; i += 3) {
          feedback += "%0D%0AOccupancy #" + ((i + 3) / 3) + ": " + occupRows[i] + "%0D%0AConstruction type: " + occupRows[i + 1] + "%0D%0ASquare Feet: " + occupRows[i + 2];
        }
        if(numUnits > 0) {
          feedback += "%0D%0AUnits: " + numUnits;
        }
        feedback += "%0D%0ARemodel cost: " + $('#remodelCost').val();
      }
    } else if (permits[i] == "plm") {
      feedback += "%0D%0A%0D%0APlumbing Permit:%0D%0AFixtures: " + $('#pgplm .fixtureQuantity').val();
    } else if (permits[i] == "sewer") {
      feedback += "%0D%0A%0D%0ASewer Permit:%0D%0ABarricade days: " + $('#pgsewer .daysForBarricade').val() + "%0D%0ARight of way: " + $('#pgsewer rowRestoration').val() + "%0D%0AConnection type: " + $('#pgsewer .connectionType').val();
    } else if (permits[i] == "wtr") {
      feedback += "%0D%0A%0D%0AWater Permit:%0D%0ABarricade days: " + $('#pgwtr .daysForBarricade').val() + "%0D%0AConnection type: " + $('#pgwtr .connectionType').val();
    } else if (permits[i] == "storm") {
      feedback += "%0D%0A%0D%0AStorm Permit:%0D%0ABarricade days: " + $('#pgstorm .daysForBarricade').val() + "%0D%0ARight of way: " + $('#pgstorm .rowRestoration').val() + "%0D%0ADischarge point: " + $('#pgstorm .dischargePoint').val();
    } else if (permits[i] == "sitedev") {
      feedback += "%0D%0A%0D%0ASite Development:%0D%0ACut-and-fill area: " + $('#cutAndFill').val() + "%0D%0AClearing area: " + $('#clearingArea').val() + "%0D%0APaved area: " + $('#pavedArea').val();
    } else if (permits[i] == "demo") {
      feedback += "%0D%0A%0D%0ADemolition:%0D%0AStructure type: " + $('#demoType').val() + "%0D%0ATotal area: " + $('#demoArea').val() + "%0D%0ATotal value: " + $('#demoCost').val();
    } else if (permits[i] == "sign") {
      feedback += "%0D%0A%0D%0ASign:%0D%0ACost: " + $('#signCost').val();
    } else if (permits[i] == "land") {
      if(useRows.length == 0) {
        useRows.push($('#luPermitType').val(), $('#luPermitSubtype').val());
      }
      for(var i = 0; i < useRows.length; i += 2) {
        feedback += "%0D%0ALand Use #" + ((i + 2) / 2) + ": %0D%0ACategory: " + useRows[i] + "%0D%0ASubcategory: " + useRows[i + 1];
      }
    }
  }
  feedback += "%0D%0A%0D%0AApp Version: v2.6";
  var w = window.open(feedback);
  setTimeout(function() {
    w.close();
  }, 100);
});
$doc.on('click', '.description-expand', function() {
  $('.description').toggleClass('open');
});
$doc.on('click', '.fee-item header', function() {
  $('.fee-item .fa-caret-right, .fee-item .fee-sub-items').removeClass('open');
  if(!$(this).siblings('.fee-sub-items').hasClass('open')) {
    $(this).siblings('.fee-sub-items').addClass('open');
    $(this).children('.fa-caret-right').addClass('open');
  }
});
$doc.on('click', 'h4', function() {
  $(this).children('i').toggleClass('open');
  $(this).siblings('.permit-category').toggleClass('open');
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
function putIn(elem, txt) {
  elem.show().addClass('fade').html(txt);
}
function takeOut(elem) {
  elem.hide().removeClass('fade').html("");
}
function bldPermit() {
  $('#pgbld .question').hide();
  putIn($('#pgbld h3'), "Building");
  putIn($('#pgbld .q1'), projectTypeText);
  $('#pgbld .q1 select').change(function() {
    takeOut($('#pgbld .q2, #pgbld .q3, #pgbld .q4, #pgbld .q5, #pgbld .q6, #pgbld .q7, #pgbld .q8'));
    if($('#project-type-1').val() == "residential") {
      projectType1 = "R";
    } else if($('#project-type-1').val() == "commercial") {
      projectType1 = "C";
    }
    if($('#project-type-2').val() == "a new building") {
      projectType2 = "N";
    } else if($('#project-type-2').val() == "a remodel on an existing building") {
      projectType2 = "R";
    } else if($('#project-type-2').val() == "adding to an existing building") {
      projectType2 = "A";
    } else if($('#project-type-2').val() == "both a remodel and an addition") {
      projectType2 = "B";
    }
    if($('#project-type-1').val() != "" && $('#project-type-2').val() != "") {
      projectType = projectType1 + projectType2;
      if(projectType == "RN" || projectType == "RA") {
        putIn($('#pgbld .q2'), structureTypeText);
        $('#structureType').change(function() {
          takeOut($('#pgbld .q3, #pgbld .q4, #pgbld .q5, #pgbld .q6, #pgbld .q7, #pgbld .q8'));
          if($(this).val() == "a single family home" || $(this).val() == "a duplex") {
            putIn($('#pgbld .q3'), livingSpaceText);
          } else if($(this).val() == "an accessory structure") {
            putIn($('#pgbld .q3'), accessoryText);
          } else {
            takeOut($('#pgbld .q4, #pgbld .q5, #pgbld .q6, #pgbld .q7, #pgbld .q8'));
          }
          $('#garageCheck').change(function() {
            if($(this).is(':checked')) {
              putIn($('#pgbld .q4'), garageAreaText);
            } else {
              takeOut($('#pgbld .q4'));
            }
          });
          $('#carportCheck').change(function() {
            if($(this).is(':checked')) {
              putIn($('#pgbld .q5'), carportAreaText);
            } else {
              takeOut($('#pgbld .q5'));
            }
          });
          $('#otherCheck').change(function() {
            if($(this).is(':checked')) {
              putIn($('#pgbld .q6'), otherAreaText);
            } else {
              takeOut($('#pgbld .q6'));
            }
          });
        });
      } else if(projectType == "RR" || projectType == "CR") {
        putIn($('#pgbld .q2'), remodelCostText);
      } else if(projectType == "CN" || projectType == "CA") {
        occupRows = [];
        numUnits = 0;
        putIn($('#pgbld .q2'), occupCatText);
        putIn($('#pgbld .q3'), cnAreaText);
        putIn($('#pgbld .q4'), constructionTypeText);
        putIn($('#pgbld .q7'), occupAddText);
        takeOut($('#pgbld .q5, #pgbld .q6, #pgbld .q8'));
        $('#occupCat').change(function() {
          if($(this).val().match("^R")) {
            putIn($('#pgbld .q5'), unitsText);
          } else {
            takeOut($('#pgbld .q5'));
          }
          putIn($('#pgbld .q3'), cnAreaText);
          putIn($('#pgbld .q4'), constructionTypeText);
          putIn($('#pgbld .q7'), occupAddText);
          if(occupRows.length > 0) {
            putIn($('#pgbld .q6'), "<table id=\"occupTable\"><tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr></table>");
            for(i = 0; i < occupRows.length; i += 3) {
              $('#occupTable').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
            }
          } else {
            takeOut($('#pgbld .q6'));
          }
          $('#occupAdd').click(function() {
            if($('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
              occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
              if($('#units').val()) {
                numUnits += parseInt($('#units').val());
              }
              putIn($('#pgbld .q6'), "<table id=\"occupTable\"><tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr></table>");
              for(i = 0; i < occupRows.length; i += 3) {
                $('#occupTable').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
              }
              $('#occupCat').val('');
              putIn($('#pgbld .q3'), cnAreaText);
              putIn($('#pgbld .q4'), constructionTypeText);
              takeOut($('#pgbld .q5'));
            } else {
              showError($(this), $('#occupCat, #cnArea, #constructionType, #pgbld .q4 input'));
            }
          });
        });
      } else if(projectType == "RB") {
        putIn($('#pgbld .q2'), structureTypeText);
        putIn($('#pgbld .q7'), remodelCostText);
        $('#pgbld .q2 select').change(function() {
          takeOut($('#pgbld .q4, #pgbld .q5, #pgbld .q6'));
          if($(this).val() == "a single family home" || $(this).val() == "a duplex") {
            putIn($('#pgbld .q3'), livingSpaceText);
          } else if($(this).val() == "an accessory structure") {
            putIn($('#pgbld .q3'), accessoryText);
          }
          $('#garageCheck').change(function() {
            if($(this).is(':checked')) {
              putIn($('#pgbld .q4'), garageAreaText);
            } else {
              takeOut($('#pgbld .q4'));
            }
          });
          $('#carportCheck').change(function() {
            if($(this).is(':checked')) {
              putIn($('#pgbld .q5'), carportAreaText);
            } else {
              takeOut($('#pgbld .q5'));
            }
          });
          $('#otherCheck').change(function() {
            if($(this).is(':checked')) {
              putIn($('#pgbld .q6'), otherAreaText);
            } else {
              takeOut($('#pgbld .q6'));
            }
          });
        });
      } else if(projectType == "CB") {
        putIn($('#pgbld .q2'), occupCatText);
        putIn($('#pgbld .q3'), cnAreaText);
        putIn($('#pgbld .q4'), constructionTypeText);
        putIn($('#pgbld .q7'), occupAddText);
        putIn($('#pgbld .q8'), remodelCostText);
        takeOut($('#pgbld .q5, #pgbld .q6'));
        $('#occupCat').change(function() {
          if($(this).val().match("^R")) {
            putIn($('#pgbld .q5'), unitsText);
          } else {
            takeOut($('#pgbld .q5'));
          }
          putIn($('#pgbld .q3'), cnAreaText);
          putIn($('#pgbld .q4'), constructionTypeText);
          putIn($('#pgbld .q7'), occupAddText);
          if(occupRows.length > 0) {
            putIn($('#pgbld .q6'), "<table id=\"occupTable\"></table>");
            $('#occupTable').html("<tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr>");
            for(i = 0; i < occupRows.length; i += 3) {
              $('#occupTable').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
            }
          } else {
            takeOut($('#pgbld .q5'));
          }
          $('#occupAdd').click(function() {
            if($('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
              occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
              numUnits += parseInt($('#units').val());
              putIn($('#pgbld .q6'), "<table id=\"occupTable\"></table>");
              $('#occupTable').html("<tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr>");
              for(i = 0; i < occupRows.length; i += 3) {
                $('#occupTable').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
              }
              $('#occupCat').val('');
              putIn($('#pgbld .q3'), cnAreaText);
              putIn($('#pgbld .q4'), constructionTypeText);
              takeOut($('#pgbld .q5'));
            } else {
              showError($(this), $('#occupCat, #cnArea, #constructionType, #pgbld .q4 input'));
            }
          });
        });
      }
    }
  });
}
function wtrPermit() {
  $('#pgwtr .question').hide();
  putIn($('#pgwtr h3'), "Water");
  putIn($('#pgwtr .q1'), waterConnectionTypeText);
  putIn($('#pgwtr .q2'), barricadeIfText);
  $('.barricadeIf').change(function() {
    if ($(this).val() == "will") {
      putIn($('#pgwtr .q3'), barricadeDaysText);
    } else {
      takeOut($('#pgwtr .q3'));
    }
  });
}
function plmPermit() {
  $('#pgplm .question').hide();
  putIn($('#pgplm h3'), "Plumbing");
  putIn($('#pgplm .q1'), plmFixtureText);
}
function stormPermit() {
  $('#pgstorm .question').hide();
  putIn($('#pgstorm h3'), "Surfacewater");
  putIn($('#pgstorm .q1'), dischargePointText);
  putIn($('#pgstorm .q2'), rowRestorationText);
  $('.rowRestoration').change(function() {
    if ($(this).val() == "will") {
      putIn($('#pgstorm .q3'), barricadeDaysText);
    } else {
      takeOut($('#pgstorm .q3'));
    }
  });
}
function sewerPermit() {
  $('#pgsewer .question').hide();
  putIn($('#pgsewer h3'), "Wastewater");
  putIn($('#pgsewer .q1'), sewerConnectionTypeText);
  putIn($('#pgsewer .q2'), rowRestorationText);
  $('.rowRestoration').change(function() {
    if ($(this).val() == "will") {
      putIn($('#pgsewer .q3'), barricadeDaysText);
    } else {
      takeOut($('#pgsewer .q3'));
    }
  });
}
function sitedevPermit() {
  $('#pgsitedev .question').hide();
  putIn($('#pgsitedev h3'), "Site Development");
  putIn($('#pgsitedev .q1'), cutAndFillText);
  putIn($('#pgsitedev .q2'), clearingAreaText);
  putIn($('#pgsitedev .q3'), pavedAreaText);
}
function signPermit() {
  $('#pgsign .question').hide();
  putIn($('#pgsign h3'), "Sign");
  putIn($('#pgsign .q1'), signCostText);
}
function demoPermit() {
  $('#pgdemo .question').hide();
  putIn($('#pgdemo h3'), "Demolition");
  putIn($('#pgdemo .q1'), demoTypeText);
  putIn($('#pgdemo .q2'), demoAreaText);
  putIn($('#pgdemo .q3'), demoCostText);
}
function landPermit() {
  useRows = [];
  $('#pgland .question').hide();
  putIn($('#pgland h3'), "Land Use");
  putIn($('#pgland .q1'), luPermitTypeText);
  putIn($('#pgland .q5'), luAddText);
  $('#luPermitType').change(function() {
    if ($(this).val() == "" || $(this).val() == "extension of permit" || $(this).val() == "site approval" || $(this).val() == "temporary homeless camp") {
      takeOut($('#pgland .q2'));
    } else if ($(this).val() == "accessory dwelling unit") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + accDwellingSubtypeText + ".</p>");
    } else if ($(this).val() == "conditional use") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + condUseSubtypeText + ".</p>");
    } else if ($(this).val() == "critical areas") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + critAreaSubtypeText + ".</p>");
    } else if ($(this).val() == "environmental review") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + envRevSubtypeText + ".</p>");
    } else if ($(this).val() == "information request") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + infReqSubtypeText + ".</p>");
    } else if ($(this).val() == "major modification of permit") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + majModSubtypeText + ".</p>");
    } else if ($(this).val() == "plats / short plats / boundary line adjustments") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + platsSubtypeText + ".</p>");
    } else if ($(this).val() == "shoreline") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + shoreSubtypeText + ".</p>");
    } else if ($(this).val() == "site rezone") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + siteRezSubtypeText + ".</p>");
    } else if ($(this).val() == "variance") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + varSubtypeText + ".</p>");
    }
    takeOut($('#pgland .q3'));
    $('#luPermitSubtype').change(function() {
      if ($('#luPermitType').val() == "plats / short plats / boundary line adjustments" && $(this).val() == "preliminary plat") {
        putIn($('#pgland .q3'), plats3rdQuestText);
        $('#thirdQuest').change(function () {
          lots = $(this).val();
        });
      } else if ($('#luPermitType').val() == "shoreline" && $(this).val() == "other than single-family") {
        putIn($('#pgland .q3'), shore3rdQuestText);
        $('#thirdQuest').change(function () {
          shoreval = $(this).val();
        });
      } else {
        takeOut($('#pgland .q3'));
      }
    });
  });
  $('#luAdd').click(function () {
    var addToTable = false;
    if($('#luPermitType').val() == "extension of permit" || $('#luPermitType').val() == "site approval" || $('#luPermitType').val() == "temporary homeless camp") {
      useRows.push($('#luPermitType').val(), "");
      addToTable = true;
    } else if ($('#luPermitType').val() != "" && $('#luPermitSubtype').val() != "") {
      useRows.push($('#luPermitType').val(), $('#luPermitSubtype').val());
      addToTable = true;
    } else if ($('#luPermitType').val() == "" || $('#luPermitSubtype').val() == "") {
      addToTable = false;
      showError($(this), $('#luPermitType, #luPermitSubtype, #pgland .q3 input'));
    }
    if (addToTable) {
      putIn($('#pgland .q4'), "<table id=\"useTable\"><tr><th>Use type:</th><th>Subtype:</th></tr></table>");
      for(i = 0; i < useRows.length; i += 2) {
        $('#useTable').append("<tr><td>" + useRows[i] + "</td><td>" + useRows[i + 1] + "</td></tr>");
      }
      $('#luPermitType').val('');
      takeOut($('#pgland .q2, #pgland .q3'));
    }
  });
}
function finalPage() {
  $('.fee-details').html("");
  for (var i in permits) {
    if (permits[i] == "bld") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"bldPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Building</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if (permits[i] == "wtr") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"wtrPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Water</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if (permits[i] == "plm") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"plmPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Plumbing</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if (permits[i] == "storm") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"stormPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Surfacewater</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if (permits[i] == "sewer") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"sewerPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Wastewater</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if (permits[i] == "sitedev") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"sitedevPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Site Development</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if (permits[i] == "sign") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"signPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Sign</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if (permits[i] == "demo") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"demoPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Demo</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if (permits[i] == "land") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"landPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Land</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    }
  }
  finalCalculation();
  $('#pgmid-pointer').addClass('post');
  $('.question-box, .tab-links li').removeClass('active');
  $('#pglast, #pglast-pointer').addClass('active');
  $('.description').addClass('open').addClass('disclaimer').html(pg3disclaimer);
}
function finalCalculation() {
  valuation = 0;
  esaFee = 0;
  smifFee = 0;
  stateFee = 0;
  planRevFee = 0;
  total = 0;
  grandTotal = 0;
  for (var i in permits) {
    if(permits[i] == "bld") {
      valuation = 0;
      permitFee = 0;
      if(projectType == "RN" || projectType == "RA" || projectType == "RB") {
        valuation = 112.65;
      }
      for(i = 0; i < occupRows.length; i += 3) {
        if(occupRows[i + 1] == "IA") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 226.92;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 207.97;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 177.49;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 176.49;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 209.94;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 175.12;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 206.97;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 181.12;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 192.29;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 108.53;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 107.53;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 101.60;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 101.60;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 181.12;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 180.72;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 304.80;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 211.20;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 206.08;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 180.72;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 132.23;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 182.28;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 152.86;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 143.93;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 180.72;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 100.60;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 99.60;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 77.82;
          }
        } else if(occupRows[i + 1] == "IB") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 219.10;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 200.15;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 172.34;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 171.34;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 202.13;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 167.31;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 199.15;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 174.43;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 185.47;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 103.54;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 102.54;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 96.60;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 96.60;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 174.43;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 174.14;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 298.11;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 204.51;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 199.38;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 174.14;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 127.09;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 175.70;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 146.27;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 139.97;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 174.14;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 95.60;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 94.60;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 73.48;
          }
        } else if(occupRows[i + 1] == "IIA") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 213.80;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 194.85;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 167.98;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 165.98;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 196.83;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 161.01;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 192.85;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 168.67;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 180.15;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 97.56;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 97.56;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 91.63;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 91.63;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 168.67;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 169.28;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 292.36;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 198.75;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 193.63;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 169.28;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 121.73;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 170.83;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 141.41;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 136.51;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 169.28;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 89.63;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 89.63;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 69.04;
          }
        } else if(occupRows[i + 1] == "IIB") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 205.04;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 186.09;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 161.18;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 160.18;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 188.07;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 153.25;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 185.09;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 160.26;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 172.12;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 93.81;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 92.81;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 86.88;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 86.88;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 160.26;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 161.12;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 283.95;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 190.34;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 185.22;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 161.12;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 115.92;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 162.68;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 133.25;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 132.83;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 161.12;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 85.88;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 84.88;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 65.52;
          }
        } else if(occupRows[i + 1] == "IIIA") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 192.95;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 174.15;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 151.95;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 149.95;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 176.32;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 140.50;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 172.15;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 146.18;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 160.72;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 84.17;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 84.17;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 78.44;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 78.44;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 146.18;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 149.06;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 268.92;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 177.26;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 172.62;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 149.06;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 106.18;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 150.87;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 122.04;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 127.95;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 149.06;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 76.44;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 76.44;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 59.23;
          }
        } else if(occupRows[i + 1] == "IIIB") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 187.36;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 168.55;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 147.76;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 146.76;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 170.72;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 135.90;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 167.55;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 140.70;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 152.55;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 80.36;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 79.36;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 73.62;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 73.62;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 140.70;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 145.04;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation = 0;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation = 0;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 166.14;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 145.04;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 102.99;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 146.84;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 118.01;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 124.61;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 145.04;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 72.62;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 71.62;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 55.31;
          }
        } else if(occupRows[i + 1] == "IV") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 198.56;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 179.61;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 155.52;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 154.52;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 181.59;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 146.77;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 178.61;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 153.97;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 166.18;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 89.86;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 88.86;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 82.93;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 82.93;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 153.97;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 161.12;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 277.65;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 184.05;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 178.93;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 161.12;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 110.26;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 162.68;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 133.25;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 130.57;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 161.12;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 81.93;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 80.93;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 62.58;
          }
        } else if(occupRows[i + 1] == "VA") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 176.18;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 157.38;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 137.58;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 135.58;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 159.54;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 123.72;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 155.38;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 128.34;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 140.46;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 70.57;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 70.57;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 64.84;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 64.84;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 128.34;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 133.69;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 251.09;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 159.42;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 154.78;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 133.69;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 91.82;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 135.49;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 106.66;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 119.73;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 133.69;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 62.84;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 62.84;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 46.83;
          }
        } else if(occupRows[i + 1] == "VB") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 169.73;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 150.92;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 132.93;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 131.93;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 153.09;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 118.27;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 149.92;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 122.72;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 136.18;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 66.08;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 65.08;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation = 0;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 59.35;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 122.72;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 129.43;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation = 0;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation = 0;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 147.16;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 129.43;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 88.16;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 131.23;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 102.41;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 112.65;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 129.43;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 58.35;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 57.35;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 44.63;
          }
        }
      }
      if($('#basementArea').val()) {
        valuation += $('#basementArea').val() * 15;
      }
      if($('#garageArea').val()) {
        valuation += $('#garageArea').val() * 44.63;
      }
      if($('#otherArea').val()) {
        valuation += $('#otherArea').val() * 112.65;
      }
      if($('#carportArea').val()) {
        valuation += $('#carportArea').val() * 33.47;
      }
      if($('#deckArea').val()) {
        valuation += $('#deckArea').val() * 29.9;
      }
      if($('#premanArea').val()) {
        valuation += parseInt($('#premanArea').val()) * 56.33;
      }
      if($('#remodelCost').val()) {
        valuation += parseInt($('#remodelCost').val());
      }
      if($('#livingSpaceArea').val() >= 2000) {
        valuation += $('#livingSpaceArea').val() * 140.81;
      } else if($('#livingSpaceArea').val() < 2000 && $('#livingSpaceArea').val() > 0) {
        valuation += $('#livingSpaceArea').val() * 112.65;
      }
      if(valuation <= 500) {
        permitFee = 39.04;
      } else if(valuation > 500 && valuation <= 2000) {
        permitFee = (39.04 + (Math.ceil((valuation - 500) / 100) * 4.88));
      } else if(valuation > 2000 && valuation <= 25000) {
        permitFee = (112.24 + (Math.ceil((valuation - 2000) / 1000) * 22.50));
      } else if(valuation > 25000 && valuation <= 50000) {
        permitFee = (629.74 + (Math.ceil((valuation - 25000) / 1000) * 16.39));
      } else if(valuation > 50000 && valuation <= 100000) {
        permitFee = (1039.49 + (Math.ceil((valuation - 50000) / 1000) * 11.26));
      } else if(valuation > 100000 && valuation <= 500000) {
        permitFee = (1602.49 + (Math.ceil((valuation - 100000) / 1000) * 9.04));
      } else if(valuation > 500000 && valuation <= 1000000) {
        permitFee = (5218.49 + (Math.ceil((valuation - 500000) / 1000) * 7.61));
      } else if(valuation > 1000000) {
        permitFee = (9023.49 + (Math.ceil((valuation - 1000000) / 1000) * 5.85));
      }
      if(projectType == "RN") {
        if($('#structureType').val() == "a single family home") {
          planRevFee = 286.24;
        } else if($('#structureType').val() == "a duplex") {
          planRevFee = 364.30;
        } else {
          planRevFee = (permitFee * .22);
        }
      } else if(projectType == "RA" || projectType == "RR" || projectType == "RB") {
        planRevFee = (permitFee * .22);
      } else if(projectType == "CN" || projectType == "CA" || projectType == "CR" || projectType == "CB") {
        planRevFee = (permitFee * .65);
      }
      if(planRevFee < 40.33) {
        planRevFee = 40.33;
      }
      esaFee = (permitFee + planRevFee) * .07;
      smifFee = permitFee * .1;
      stateFee = 4.5;
      if(numUnits > 0) {
        stateFee += 2 * (numUnits - 1);
      }
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('.description').addClass('open').addClass('disclaimer').html("<div class=\"disclaimer\">This fee estimator is intended for informational purposes only, and currently available for limited permit types.  Please note, complete identification of all required permits and final fee calculations will be completed during the processing of a permit application.</div>");
      $('#bldPermitFeeDetails .base .money').html("$" + permitFee.toFixed(2));
      $('#bldPermitFeeDetails .esa .money').html("$" + esaFee.toFixed(2));
      $('#bldPermitFeeDetails .smif .money').html("$" + smifFee.toFixed(2));
      $('#bldPermitFeeDetails .state .money').html("$" + stateFee.toFixed(2));
      $('#bldPermitFeeDetails .review .money').html("$" + planRevFee.toFixed(2));
      $('#bldPermitFeeDetails .total').html("$" + total.toFixed(2));
    } else if (permits[i] == "plm") {
      permitFee = 44.83;
      if ($('.fixtureQuantity').val() > 0) {
        permitFee += 32.02 + (($('.fixtureQuantity').val() - 1) * 12.36);
      }
      esaFee = 0;
      smifFee = 0;
      stateFee = 0;
      planRevFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#plmPermitFeeDetails .base .money').html("$" + permitFee.toFixed(2));
      $('#plmPermitFeeDetails .esa .money').html("$" + esaFee.toFixed(2));
      $('#plmPermitFeeDetails .smif .money').html("$" + smifFee.toFixed(2));
      $('#plmPermitFeeDetails .state .money').html("$" + stateFee.toFixed(2));
      $('#plmPermitFeeDetails .review .money').html("$" + planRevFee.toFixed(2));
      $('#plmPermitFeeDetails .total').html("$" + total.toFixed(2));
    } else if (permits[i] == "sewer") {
      permitFee = 85.81;
      if($('#pgsewer .connectionType').val() == "replacing" || $('#pgsewer .connectionType').val() == "repairing") {
        permitFee += 281.77;
      } else if ($('#pgsewer .connectionType').val() == "adding") {
        permitFee += 320.19;
      }
      esaFee = permitFee * .07;
      if ($('#pgsewer .rowRestoration').val() == "will") {
        permitFee += 76.85;
        if($('#pgsewer .daysForBarricade').val() > 0 && $('#pgsewer .daysForBarricade').val() <= 5) {
          permitFee += parseInt($('#pgsewer .daysForBarricade').val()) * 52.04;
        } else {
          permitFee += 260.21;
        }
      }
      smifFee = 0;
      stateFee = 0;
      planRevFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#sewerPermitFeeDetails .base .money').html("$" + permitFee.toFixed(2));
      $('#sewerPermitFeeDetails .esa .money').html("$" + esaFee.toFixed(2));
      $('#sewerPermitFeeDetails .smif .money').html("$" + smifFee.toFixed(2));
      $('#sewerPermitFeeDetails .state .money').html("$" + stateFee.toFixed(2));
      $('#sewerPermitFeeDetails .review .money').html("$" + planRevFee.toFixed(2));
      $('#sewerPermitFeeDetails .total').html("$" + total.toFixed(2));
    } else if (permits[i] == "wtr") {
      permitFee = 0;
      if($('#pgwtr .connectionType').val() == "replacing" || $('#pgwtr .connectionType').val() == "repairing") {
        permitFee = 76.85;
      } else if ($('#pgwtr .connectionType').val() == "adding") {
        permitFee = 153.69;
      }
      esaFee = permitFee * .07;
      if ($('#pgwtr .barricadeIf').val() == "will") {
        if($('#pgwtr .daysForBarricade').val() > 0 && $('#pgwtr .daysForBarricade').val() <= 5) {
          permitFee += parseInt($('#pgwtr .daysForBarricade').val()) * 52.04;
        } else {
          permitFee += 260.21;
        }
      }
      smifFee = 0;
      stateFee = 0;
      planRevFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#wtrPermitFeeDetails .base .money').html("$" + permitFee.toFixed(2));
      $('#wtrPermitFeeDetails .esa .money').html("$" + esaFee.toFixed(2));
      $('#wtrPermitFeeDetails .smif .money').html("$" + smifFee.toFixed(2));
      $('#wtrPermitFeeDetails .state .money').html("$" + stateFee.toFixed(2));
      $('#wtrPermitFeeDetails .review .money').html("$" + planRevFee.toFixed(2));
      $('#wtrPermitFeeDetails .total').html("$" + total.toFixed(2));
    } else if (permits[i] == "storm") {
      permitFee = 384.23;
      esaFee = permitFee * .07;
      if ($('#pgstorm .rowRestoration').val() == "will") {
        if($('#pgstorm .dischargePoint').val() == "a sidewalk drain") {
          permitFee += 76.85;
        }
        if($('#pgstorm .daysForBarricade').val() > 0 && $('#pgstorm .daysForBarricade').val() <= 5) {
          permitFee += parseInt($('#pgstorm .daysForBarricade').val()) * 52.04;
        } else {
          permitFee += 260.21;
        }
      }
      smifFee = 0;
      stateFee = 0;
      planRevFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#stormPermitFeeDetails .base .money').html("$" + permitFee.toFixed(2));
      $('#stormPermitFeeDetails .esa .money').html("$" + esaFee.toFixed(2));
      $('#stormPermitFeeDetails .smif .money').html("$" + smifFee.toFixed(2));
      $('#stormPermitFeeDetails .state .money').html("$" + stateFee.toFixed(2));
      $('#stormPermitFeeDetails .review .money').html("$" + planRevFee.toFixed(2));
      $('#stormPermitFeeDetails .total').html("$" + total.toFixed(2));
    } else if (permits[i] == "sitedev") {
      if ($('#cutAndFill').val() > 0 && $('#cutAndFill').val() <= 100) {
        permitFee = 195.16;
        planRevFee = 83.28;
      } else if ($('#cutAndFill').val() > 100 && $('#cutAndFill').val() <= 1000) {
        permitFee = 195.16 + (35.12 * Math.ceil(($('#cutAndFill').val() - 100) / 100));
        planRevFee = 104.07;
      } else if ($('#cutAndFill').val() > 1000 && $('#cutAndFill').val() <= 10000) {
        permitFee = 511.23 + (37.73 * Math.ceil(($('#cutAndFill').val() - 1000) / 1000));
        planRevFee = 130.10;
      } else if ($('#cutAndFill').val() > 10000 && $('#cutAndFill').val() <= 100000) {
        permitFee = 850.81 + (171.75 * Math.ceil(($('#cutAndFill').val() - 10000) / 10000));
        planRevFee = 130.10 + (63.76 * Math.ceil(($('#cutAndFill').val() - 10000) / 10000));
      } else if ($('#cutAndFill').val() > 100000 && $('#cutAndFill').val() <= 200000) {
        permitFee = 2396.56 + (94.98 * Math.ceil(($('#cutAndFill').val() - 100000) / 100000));
        planRevFee = 704.16 + (34.48 * Math.ceil(($('#cutAndFill').val() - 100000) / 10000));
      } else if ($('#cutAndFill').val() > 200000) {
        permitFee = 2396.56 + (94.98 * Math.ceil(($('#cutAndFill').val() - 100000) / 100000));
        planRevFee = 1048.69 + (18.85 * Math.ceil(($('#cutAndFill').val() - 200000) / 10000));
      }
      // fees[2] = 230.54 + (38.42 * Math.ceil(($('#pavedArea').val() - 3000) / 3000));
      acres = Math.ceil($('#clearingArea').val() / 43560);
      if (acres == 1) {
        permitFee += 128.08;
      } else if (acres == 2) {
        permitFee += 192.11;
      } else if (acres > 2 && acres <= 5) {
        permitFee += 256.15;
      } else if (acres > 5 && acres <= 10) {
        permitFee += 256.15 + ((acres - 5) * 32.02);
      } else if (acres > 10) {
        permitFee += 416.25 + ((acres - 10) * 25.62);
      }
      esaFee = (permitFee + planRevFee) * .07;
      smifFee = 0;
      stateFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#sitedevPermitFeeDetails .base .money').html("$" + permitFee.toFixed(2));
      $('#sitedevPermitFeeDetails .esa .money').html("$" + esaFee.toFixed(2));
      $('#sitedevPermitFeeDetails .smif .money').html("$" + smifFee.toFixed(2));
      $('#sitedevPermitFeeDetails .state .money').html("$" + stateFee.toFixed(2));
      $('#sitedevPermitFeeDetails .review .money').html("$" + planRevFee.toFixed(2));
      $('#sitedevPermitFeeDetails .total').html("$" + total.toFixed(2));
    } else if (permits[i] == "sign") {
      valuation = $('#signCost').val();
      if(valuation <= 500) {
        permitFee = 39.04;
      } else if(valuation > 500 && valuation <= 2000) {
        permitFee = (39.04 + (Math.ceil((valuation - 500) / 100) * 4.88));
      } else if(valuation > 2000 && valuation <= 25000) {
        permitFee = (112.24 + (Math.ceil((valuation - 2000) / 1000) * 22.50));
      } else if(valuation > 25000 && valuation <= 50000) {
        permitFee = (629.74 + (Math.ceil((valuation - 25000) / 1000) * 16.39));
      } else if(valuation > 50000 && valuation <= 100000) {
        permitFee = (1039.49 + (Math.ceil((valuation - 50000) / 1000) * 11.26));
      } else if(valuation > 100000 && valuation <= 500000) {
        permitFee = (1602.49 + (Math.ceil((valuation - 100000) / 1000) * 9.04));
      } else if(valuation > 500000 && valuation <= 1000000) {
        permitFee = (5218.49 + (Math.ceil((valuation - 500000) / 1000) * 7.61));
      } else if(valuation > 1000000) {
        permitFee = (9023.49 + (Math.ceil((valuation - 1000000) / 1000) * 5.85));
      }
      if(projectType == "RN") {
        if($('#structureType').val() == "a single family home") {
          planRevFee = 286.24;
        } else if($('#structureType').val() == "a duplex") {
          planRevFee = 364.30;
        } else {
          planRevFee = (permitFee * .22);
        }
      } else if(projectType == "RA" || projectType == "RR" || projectType == "RB") {
        planRevFee = (permitFee * .22);
      } else if(projectType == "CN" || projectType == "CA" || projectType == "CR" || projectType == "CB") {
        planRevFee = (permitFee * .65);
      }
      if(planRevFee < 40.33) {
        planRevFee = 40.33;
      }
      esaFee = (permitFee + planRevFee) * .07;
      smifFee = permitFee * .1;
      stateFee = 4.5;
      if(numUnits > 0) {
        stateFee += 2 * (numUnits - 1);
      }
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#signPermitFeeDetails .base .money').html("$" + permitFee.toFixed(2));
      $('#signPermitFeeDetails .esa .money').html("$" + esaFee.toFixed(2));
      $('#signPermitFeeDetails .smif .money').html("$" + smifFee.toFixed(2));
      $('#signPermitFeeDetails .state .money').html("$" + stateFee.toFixed(2));
      $('#signPermitFeeDetails .review .money').html("$" + planRevFee.toFixed(2));
      $('#signPermitFeeDetails .total').html("$" + total.toFixed(2));
    } else if (permits[i] == "demo") {
      if ($('#demoType').val() == "residential") {
        if ($('#demoArea').val() <= 2500) {
          permitFee = 97.58;
        } else if ($('#demoArea').val() > 2500 && $('#demoArea').val() <= 20000) {
          permitFee = 136.61;
        } else if ($('#demoArea').val() > 20000) {
          permitFee = 221.17;
        }
      } else if ($('#demoType').val() == "commercial") {
        if ($('#demoArea').val() <= 20000) {
          permitFee = 136.61;
        } else if ($('#demoArea').val() > 20000) {
          permitFee = 221.17;
        }
      }
      valuation = $('#demoCost').val();
      if(valuation <= 500) {
        permitFee += 39.04;
      } else if(valuation > 500 && valuation <= 2000) {
        permitFee += (39.04 + (Math.ceil((valuation - 500) / 100) * 4.88));
      } else if(valuation > 2000 && valuation <= 25000) {
        permitFee += (112.24 + (Math.ceil((valuation - 2000) / 1000) * 22.50));
      } else if(valuation > 25000 && valuation <= 50000) {
        permitFee += (629.74 + (Math.ceil((valuation - 25000) / 1000) * 16.39));
      } else if(valuation > 50000 && valuation <= 100000) {
        permitFee += (1039.49 + (Math.ceil((valuation - 50000) / 1000) * 11.26));
      } else if(valuation > 100000 && valuation <= 500000) {
        permitFee += (1602.49 + (Math.ceil((valuation - 100000) / 1000) * 9.04));
      } else if(valuation > 500000 && valuation <= 1000000) {
        permitFee += (5218.49 + (Math.ceil((valuation - 500000) / 1000) * 7.61));
      } else if(valuation > 1000000) {
        permitFee += (9023.49 + (Math.ceil((valuation - 1000000) / 1000) * 5.85));
      }
      if(projectType == "RN") {
        if($('#structureType').val() == "a single family home") {
          planRevFee = 286.24;
        } else if($('#structureType').val() == "a duplex") {
          planRevFee = 364.30;
        } else {
          planRevFee = (permitFee * .22);
        }
      } else if(projectType == "RA" || projectType == "RR" || projectType == "RB") {
        planRevFee = (permitFee * .22);
      } else if(projectType == "CN" || projectType == "CA" || projectType == "CR" || projectType == "CB") {
        planRevFee = (permitFee * .65);
      }
      if(planRevFee < 40.33) {
        planRevFee = 40.33;
      }
      stateFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#demoPermitFeeDetails .base .money').html("$" + permitFee.toFixed(2));
      $('#demoPermitFeeDetails .esa .money').html("$" + esaFee.toFixed(2));
      $('#demoPermitFeeDetails .smif .money').html("$" + smifFee.toFixed(2));
      $('#demoPermitFeeDetails .state .money').html("$" + stateFee.toFixed(2));
      $('#demoPermitFeeDetails .review .money').html("$" + planRevFee.toFixed(2));
      $('#demoPermitFeeDetails .total').html("$" + total.toFixed(2));
    } else if (permits[i] == "land") {
      for (var i = 0; i < useRows.length; i += 2) {
        if (useRows[i] == "accessory dwelling unit") {
          permitFee += 806.66;
        } else if (useRows[i] == "conditional use") {
          if (useRows[i + 1] == "duplex, triplex, townhome in R-2SRD and HMR-SRD districts" || useRows[i + 1] == "duplex, triplex, townhome in NRX district" || useRows[i + 1] == "general" || useRows[i + 1] == "historic structure re-use" || useRows[i + 1] == "special needs housing" || useRows[i + 1] == "use in south Tacoma M/IC overlay district") {
            permitFee += 4813.92;
          } else if (useRows[i + 1] == "day care centers, 13-49 children") {
            permitFee += 806.66;
          } else if (useRows[i + 1] == "large scale retail") {
            permitFee += 4813.92;
          }
        } else if (useRows[i] == "critical areas") {
          if (useRows[i + 1] == "activities allowed with staff review") {
            permitFee += 846.99;
          } else if (useRows[i + 1] == "development permit") {
            permitFee += 8258.16;
          } else if (useRows[i + 1] == "minor development permit") {
            permitFee += 3151.3;
          } else if (useRows[i + 1] == "verification") {
            permitFee += 1656.61;
          }
        } else if (useRows[i] == "environmental review") {
          if (useRows[i + 1] == "addendum EIS") {
            permitFee += 806.66;
          } else if (useRows[i + 1] == "environmental impact statement") {
            permitFee += 2406.96;
          } else if (useRows[i + 1] == "supplemental EIS") {
            permitFee += 1626.32;
          } else if (useRows[i + 1] == "buildings over 20,000 square feet") {
            permitFee += 2406.96;
          } else if (useRows[i + 1] == "grading permits > 500 cy and residential buildings > 20 units and 6,000 - 10,000 square feet") {
            permitFee += 1138.43;
          } else if (useRows[i + 1] == "parking lots > 40 stalls, signs, residential buildings of > 20 units and < 6000 square feet and misc actions") {
            permitFee += 650.52;
          } else if (useRows[i + 1] == "residential buildings > 20 units and 10,001 - 20,000 square feet or commerical building 12,000 - 20,000 square feet") {
            permitFee += 2406.96;
          } else if (useRows[i + 1] == "SEPA with a discretionary land use permit") {
            permitFee += 481.39;
          }
        } else if (useRows[i] == "information request") {
          if (useRows[i + 1] == "determination or interpretation by director") {
            permitFee += 884.72;
          } else if (useRows[i + 1] == "uses not specifically classified") {
            permitFee += 884.72;
          } else if (useRows[i + 1] == "zoning verification letter") {
            permitFee += 162.63;
          }
        } else if (useRows[i] == "major modification of permit") {
          if (useRows[i + 1] == "all others") {
            permitFee += 2406.96;
          } else if (useRows[i + 1] == "conditional use permit") {
            permitFee += 2406.96;
          } else if (useRows[i + 1] == "single-family residential") {
            permitFee += 481.39;
          }
        } else if (useRows[i] == "plats / short plats / boundary line adjustments") {
          if (useRows[i + 1] == "binding site plan approval") {
            permitFee += 1606.8;
          } else if (useRows[i + 1] == "boundary line adjustment") {
            permitFee += 962.79;
          } else if (useRows[i + 1] == "final short or long plat") {
            permitFee += 1606.8;
          } else if (useRows[i + 1] == "preliminary plat") {
            if (lots == 2) {
              permitFee += 1288.05;
            } else if (lots == 3) {
              permitFee += 1925.57;
            } else if (lots == 4) {
              permitFee += 2569.59;
            } else if (lots > 4 && lots < 10) {
              permitFee += 4033.28;
            } else if (lots >= 10) {
              permitFee += 4163.38 + ((lots - 10) * 120.35);
            }
          }
        } else if (useRows[i] == "shoreline") {
          if (useRows[i + 1] == "single-family residential") {
            permitFee += 806.66;
          } else if (useRows[i + 1] == "exemption") {
            permitFee += 1606.8;
          } else if (useRows[i + 1] == "other than single-family") {
            if (shoreval <= 500000) {
              permitFee += 6440.24;
            } else if (shoreval > 500000 && shoreval <= 1000000) {
              permitFee += 8066.56;
            } else if (shoreval > 1000000 && shoreval <= 1500000) {
              permitFee += 9627.83;
            } else if (shoreval > 1500000 && shoreval <= 2000000) {
              permitFee += 11254.15;
            } else if (shoreval > 2000000) {
              permitFee += 11254.15 + (Math.ceil((shoreval - 2000000) / 1000000) * 1626.32);
            }
          } else if (useRows[i + 1] == "revisions - single-family") {
            permitFee += 481.39;
          } else if (useRows[i + 1] == "revisions - other than single-family") {
            permitFee += 2406.96;
          }
        } else if (useRows[i] == "site rezone") {
          if (useRows[i + 1] == "all other districts") {
            permitFee += 9627.83;
          } else if (useRows[i + 1] == "single-family family dwelling district (R-1, R-2, R2SRD)") {
            permitFee += 2406.96;
          } else if (useRows[i + 1] == "two-family dwelling district") {
            permitFee += 3252.64;
          }
        } else if (useRows[i] == "variance") {
          if (useRows[i + 1] == "accessory building height") {
            permitFee += 806.66;
          } else if (useRows[i + 1] == "design" || useRows[i + 1] == "development regulations (other than single-family residential)" || useRows[i + 1] == "minor variance (other than single-family residential)" || useRows[i + 1] == "parking" || useRows[i + 1] == "signs") {
            permitFee += 2406.96;
          } else if (useRows[i + 1] == "development regulations (single-family residential)" || useRows[i + 1] == "minor variance (single-family residential)") {
            permitFee += 806.66;
          } else if (useRows[i + 1] == "view-sensitive overlay district main building height") {
            permitFee += 1626.32;
          }
        } else if (useRows[i] == "extension of permit") {
          permitFee += 403.32;
        } else if (useRows[i] == "site approval") {
          permitFee += 9627.83;
        } else if (useRows[i] == "temporary homeless camp") {
          permitFee += 117.09;
        }
      }
      smifFee = 0;
      stateFee = 0;
      planRevFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#landPermitFeeDetails .base .money').html("$" + permitFee.toFixed(2));
      $('#landPermitFeeDetails .esa .money').html("$" + esaFee.toFixed(2));
      $('#landPermitFeeDetails .smif .money').html("$" + smifFee.toFixed(2));
      $('#landPermitFeeDetails .state .money').html("$" + stateFee.toFixed(2));
      $('#landPermitFeeDetails .review .money').html("$" + planRevFee.toFixed(2));
      $('#landPermitFeeDetails .total').html("$" + total.toFixed(2));
    }
  }
  $('#grandTotal').html("$" + grandTotal.toFixed(2));
}
function backPermit(thisperm) {
  if (permits.length == 1 || thisperm == permits[0]) {
    $('#details-num').text("");
    $('#pgfirst-pointer').removeClass('post');
    $('.description').addClass('open').removeClass('disclaimer').html(pg12instructions);
    $('#pg' + thisperm + ', #pgmid-pointer').removeClass('active');
    $('#pgfirst, #pgfirst-pointer').addClass('active');
  } else {
    $('#details-num').text(" (" + $.inArray(thisperm, permits) + "/" + permits.length + ")");
    currentPermit = permits[$.inArray(thisperm, permits) - 1];
    $('#pg' + thisperm).removeClass('active');
    $('#pg' + currentPermit + ', #pgmid-pointer').addClass('active');
  }
}
function nextPermit(thisperm) {
  $('#details-num').text(" (" + ($.inArray(thisperm, permits) + 1) + "/" + permits.length + ")");
  if (thisperm == "bld") {
    bldPermit();
  } else if (thisperm == "wtr") {
    wtrPermit();
  } else if (thisperm == "plm") {
    plmPermit();
  } else if (thisperm == "storm") {
    stormPermit();
  } else if (thisperm == "sewer") {
    sewerPermit();
  } else if (thisperm == "sitedev") {
    sitedevPermit();
  } else if (thisperm == "sign") {
    signPermit();
  } else if (thisperm == "demo") {
    demoPermit();
  } else if (thisperm == "land") {
    landPermit();
  }
}
