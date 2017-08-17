var projectType1, projectType2, projectType, fixtures, daysForBarricade, rowRestoration, connectionType, dischargePoint, structureType;
var occupRows = [];
var useRows = [];
var fixtureRows = [];
var permits = [];
var currentPermit = "";
var readyForLastPage = false;
var readyforNextPage = false;
var ePermitQualifies = false;
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
var basicPage = '<h3></h3><form class="question-content"><div class="question q1"></div><div class="question q2"></div><div class="question q3"></div><div class="question q4"></div><div class="question q5"></div><div class="question q6"></div><div class="question q7"></div><div class="question q8"></div><div class="question q9"></div><div class="question q10"></div><div class="question q11"></div></form><button class="btn back"><i class="fa fa-chevron-left" aria-hidden="true"></i><span> Back</span></button><button class="btn next"><span>Next </span><i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
var projectTypeText = 'I\'m working on a <select id="project-type-1"><option></option><option>residential</option><option>commercial</option></select><span class="tooltip-wrapper mid-page"><i class="fa fa-question tooltip-pointer" aria-hidden="true"></i><div class="tooltip"><div><b>Residential:</b> Single-Family, Duplex, and Townhomes 1-2 Units</div><div><b>Commercial:</b> Triplex, Multi-Family, Mixed-Use, Industrial, and Non-Residential Buildings</div></div></span> project that is <select id="project-type-2"><option></option><option>a new building</option><option>a remodel on an existing building</option><option>adding to an existing building</option><option>both a remodel and an addition</option></select><span class="tooltip-wrapper mid-page"><i class="fa fa-question tooltip-pointer" aria-hidden="true"></i><div class="tooltip"><div><b>New:</b> Construction of an entirely new building or structure</div><div><b>Remodel:</b> Change of the interior characteristics of an existing building and/or space</div><div><b>Addition:</b> Extension or increase in floor area or height of a existing structure</div></div></span>.';
var structureTypeText = '<p>This project is <select id="structureType"><option></option><option>a single family home</option><option>a duplex</option><option>an accessory structure</option></select>.</p>';
var livingSpaceText = '<p>The new living space added will total <input type="number" placeholder="0" min="0" step="50" id="livingSpaceArea"> square feet.</p><p>The new attached garage area will total <input type="number" placeholder="0" min="0" step="50" id="garageArea"> square feet.</p><p>The new premanufactured housing area will total <input type="number" placeholder="0" min="0" step="50" id="premanArea"> square feet.</p><p>The new unfinished basement area will total <input type="number" placeholder="0" min="0" step="50" id="basementArea"> square feet.</p><p>The new deck and / or porch area will total <input type="number" placeholder="0" min="0" step="50" id="deckArea"> square feet.</p>';
var accessoryText = '<p>I would describe my accessory building(s) as...</p><p><input type="checkbox" name="garage" id="garageCheck"> <label for="garageCheck">A garage</label></p><p><input type="checkbox" name="carport" id="carportCheck"> <label for="carportCheck">A carport</label></p><p><input type="checkbox" name="other" id="otherCheck"> <label for="otherCheck">Some other kind of structure</label></p>';
var garageAreaText = '<p>The new detached garage area will total <input type="number" placeholder="0" min="0" step="50" id="garageArea"> square feet.</p>';
var carportAreaText = '<p>The new carport structure area will total <input type="number" placeholder="0" min="0" step="50" id="carportArea"> square feet.</p>';
var otherAreaText = '<p>The new other structure area will total <input type="number" placeholder="0" min="0" step="50" id="otherArea"> square feet.</p>';
var occupCatText = '<p>This building has <select id="occupCat"><option></option><option>A-1 Assembly, theaters, with stage</option><option>A-1 Assembly, theaters, without stage</option><option>A-2 Assembly, nightclubs</option><option>A-2 Assembly, restaurants, bars, banquet halls</option><option>A-3 Assembly, churches</option><option>A-3 Assembly, general, community halls, libraries, museums</option><option>A-4 Assembly, arenas</option><option>B Business</option><option>E Educational</option><option>F-1 Factory and industrial, moderate hazard</option><option>F-2 Factory and industrial, low hazard</option><option>H-1 High Hazard, explosives</option><option>H234 High Hazard</option><option>H-5 HPM</option><option>I-1 Institutional, supervised environment</option><option>I-2 Institutional, hospitals</option><option>I-2 Institutional, nursing homes</option><option>I-3 Institutional, restrained</option><option>I-4 Institutional, day care facilities</option><option>M Mercantile</option><option>R-1 Residential, hotels</option><option>R-2 Residential, multiple family</option><option>R-3 Residential, one- and two-family</option><option>R-4 Residential, care/assisted living facilities</option><option>S-1 Storage, moderate hazard</option><option>S-2 Storage, low hazard</option><option>U Utility, miscellaneous</option></select> occupancy.</p>';
var remodelCostText = '<p>The total value of my building costs, materials, and labor for my remodel (separate from any additions) is $ <input type="number" placeholder="-.--" id="remodelCost" min="0" step="50">.</p>';
var unitsText = 'There are <input type="number" placeholder="0" id="units" min="0" step="1"> units in this occupancy.';
var cnAreaText = '<p>The total area for this type of occupancy is <input id="cnArea" type="number" placeholder="0" min="0" step="50"> square feet.</p>';
var constructionTypeText = '<p>The type of construction for this project is <select id="constructionType"><option></option><option>IA</option><option>IB</option><option>IIA</option><option>IIB</option><option>IIIA</option><option>IIIB</option><option>IV</option><option>VA</option><option>VB</option></select>.</p><p class="disclaimer">If you aren\'t sure, use VB</p>';
var occupAddText = '<span class="btn" id="occupAdd">There are more occupancy types</span>';
var plmFixtureText = '<p>There are <input class="fixtureQuantity" type="number" placeholder="0" min="0"> fixtures being worked on.</p><p>Fixtures may include water closets, basins, bathtubs, showers, sinks, laundry trays, water heaters, dishwashers, wash machines, urinals, backflow preventers, floor drains, drinking fountains, pressure reducing valves, sump pumps, floor sinks, mop sinks, grease traps, or others.</p>';
var barricadeIfText = '<p>I <select class="barricadeIf"><option></option><option>will</option><option>will not</option></select> need a barricade for this work.</p>';
var barricadeDaysText = '<p>I will be setting up a barricade for <input class="daysForBarricade" type="number" placeholder="0" min="0" max="31"> days for the right-of-way work.</p>';
var rowRestorationText = '<p>This project <select class="rowRestoration"><option></option><option>will</option><option>will not</option></select> require right-of-way work on a public sidewalk, street, or pavement around the property.</p>';
var sewerConnectionTypeText = '<p>I\'ll be <select class="connectionType"><option></option><option>replacing</option><option>adding</option><option>repairing</option></select> a side sewer.</p>';
var waterConnectionTypeText = '<p>I\'ll be <select class="connectionType"><option></option><option>replacing</option><option>adding</option><option>repairing</option></select> a water service line.</p>';
var dischargePointText = '<p>The discharge point for the storm connection is <select class="dischargePoint"><option></option><option>a catch basin</option><option>a manhole</option><option>an on-site system</option><option>a curb drain</option></select>.</p>';
var clearingOrGrading = '<p>This project will be <select class="clearingOrGrading"><option></option><option>clearing</option><option>grading</option></select> the development area.</p>';
var cutAndFillText = '<p>The total area being cut from the site is <input type="number" id="cutArea" min="0" step="50"> cubic yards.</p><p>The total area being filled from the site is <input type="number" id="fillArea" min="0" step="50"> cubic yards.</p>';
var clearingAreaText = '<p>The total clearing area is <input type="number" id="clearingArea" min="0" step="50"> square feet.</p>';
var pavedAreaText = '<p>The total paved surface area is <input type="number" id="pavedArea" min="0" step="50"> square feet.</p>';
var signCostText = '<p>The total construction cost, including materials and labor, for the sign is $ <input type="number" placeholder="-.--" id="signCost" min="0" step="50">.</p>';
var demoTypeText = '<p>This structure being demolished is a <select id="demoType"><option></option><option>residential</option><option>commercial</option></select> structure.</p>';
var demoAccText = '<p>This structure being demolished <select id="demoAcc"><option></option><option>is</option><option>is not</option></select> an <b>accessory</b> structure.</p>';
var demoAccPlmText = '<p>There <select id="demoAcc"><option></option><option>is</option><option>is not</option></select> plumbing serving the accessory structure.</p>';
var demoAreaText = '<p>The total area inside the structure is <input type="number" id="demoArea" min="0" step="50"> square feet.</p>';
var luPermitTypeText = '<p>I\'m looking for a(n) <select id="luPermitType"><option></option><option>accessory dwelling unit</option><option>conditional use</option><option>critical areas</option><option>environmental review</option><option>extension of permit</option><option>information request</option><option>major modification of permit</option><option>plats / short plats / boundary line adjustments</option><option>shoreline</option><option>site approval</option><option>site rezone</option><option>temporary homeless camp</option><option>variance</option></select> land use permit.</p>';
var accDwellingSubtypeText = '<select id="luPermitSubtype"><option></option><option>attached</option><option>detached</option></select>';
var condUseSubtypeText = '<select id="luPermitSubtype"><option></option><option>general</option><option>day care centers, 13-49 children</option><option>duplex, triplex, townhome in R-2SRD and HMR-SRD districts</option><option>duplex, triplex, townhome in NRX district</option><option>historic structure re-use</option><option>large scale retail</option><option>special needs housing</option><option>use in south Tacoma M/IC overlay district</option></select>';
var critAreaSubtypeText = '<select id="luPermitSubtype"><option></option><option>activities allowed with staff review</option><option>development permit</option><option>minor development permit</option><option>verification</option></select>';
var envRevSubtypeText = '<select id="luPermitSubtype"><option></option><option>addendum EIS</option><option>buildings over 20,000 square feet</option><option>environmental impact statement</option><option>grading permits > 500 cy and residential buildings of > 20 units and 6,001 - 10,000 square feet</option><option>parking lots > 40 stalls, signs, residential buildings > 20 units and < 6,000 square feet, and misc. actions</option><option>residential buildings > 20 units and 10,001 - 20,000 square feet or commercial buildings 12,000 - 20,000 square feet</option><option>SEPA with a discretionary land use permit</option><option>supplemental EIS</option></select>';
var infReqSubtypeText = '<select id="luPermitSubtype"><option></option><option>determination or interpretation by director</option><option>uses not specifically classified</option><option>zoning verification letter</option></select>';
var majModSubtypeText = '<select id="luPermitSubtype"><option></option><option>all others</option><option>conditional use permit</option><option>single-family residential</option></select>';
var platsSubtypeText = '<select id="luPermitSubtype"><option></option><option>binding site plan approval</option><option>boundary line adjustment</option><option>final short or long plat</option><option>preliminary plat</option><option>segregation / combination</option></select>';
var shoreSubtypeText = '<select id="luPermitSubtype"><option></option><option>single-family residential</option><option>exemption</option><option>other than single-family</option><option>revisions - single-family</option><option>revisions - other than single-family</option></select>';
var siteRezSubtypeText = '<select id="luPermitSubtype"><option></option><option>all other districts</option><option>single-family dwelling district (R-1, R-2, R-2SRD)</option><option>two-family dwelling district</option></select>';
var varSubtypeText = '<select id="luPermitSubtype"><option></option><option>accessory building height</option><option>design</option><option>development regulations (other than single-family residential)</option><option>development regulations (single-family residential)</option><option>minor variance (other than single-family residential)</option><option>minor variance (single-family residential)</option><option>parking</option><option>signs</option><option>view-sensitive overlay district - main building height</option></select>';
var plats3rdQuestText = '<p>There are <input type="number" id="thirdQuest" min="2" step="1"> lots in this plat.</p>';
var shore3rdQuestText = '<p>The total valuation of the shoreline work is <input type="number" placeholder="-.--" id="thirdQuest" min="0" step="100000">.</p>';
var luAddText = '<span class="btn" id="luAdd">I\'ll need another permit</span>';
var fireCategoriesText = '<p>This project will include <select id="fireCategories"><option></option><option>fire alarms</option><option>pre-engineered systems</option><option>kitchen hood suppression systems</option><option>private fire service mains and their appurtenances</option><option>fire sprinkler tenant improvement</option><option>new water based fire suppression systems</option><option>smoke control systems</option></select>.</p>';
var fireAlarmText = '<p>Number of devices: <input type="number" min="0"></p>';
var firePreEngText = '<p>Number of systems: <input type="number" id="firePreEngSys" min="0"></p><p>Number of nozzles: <input type="number" id="firePreEngNoz" min="0"></p>';
var fireKitchenText = '<p>Number of systems: <input type="number" min="0"></p>';
var fireServMainsText = '<p>Number of hydrants, sprinkler supplies, and fire department connections: <input type="number" min="0"></p>';
var fireSprinklerText = '<p>Number of heads: <input type="number" id="fireSprinklerHeads" min="0"></p>';
var fireSuppressionText = '<p>Number of fire sprinkler risers: <input type="number" id="fireSuppressionRisers" min="0"></p><p>Number of heads: <input type="number" id="fireSuppressionHeads" min="0"></p><p>Number of standpipes: <input type="number" id="fireSuppressionStandpipes" min="0"></p><p>Number of fire pumps: <input type="number" id="fireSuppressionPumps" min="0"></p>';
var eventTypeText = '<p>This organization hosting this event is <select id="eventOrgType"><option></option><option>residential or non-profit</option><option>commercial</option></select>.</p>';
var eventAttendanceText = '<p>The estimated attendance for the event will be <input type="number" id="eventAttendance" min="50" step="50">.</p>';
var eventDateText = '<p>The date for the event will be <input type="date" id="eventDate">.</p>';
var rowTypeText = '<p>This project will involve <select id="rowType"><option></option><option>construction on</option><option>use of</option><option>utility work in</option></select> the right-of-way.</p>';
var rowConstructionTypeText = '<p>This project will include...<p><input type="checkbox" name="curb" id="rconCurb"><label for="rconCurb">Curb or gutter work</label></p><p><input type="checkbox" name="sidewalk" id="rconSidewalk"><label for="rconSidewalk">Work on the sidewalk</label></p><p><input type="checkbox" name="driveway" id="rconDriveway"><label for="rconDriveway">Work on a driveway</label></p><p><input type="checkbox" name="trenchBore" id="rconTrenchBore"><label for="rconTrenchBore">Trench and / or bore work</label></p>';
var rowSidewalkWorkText = '<p>In this project, I will be <select id="rowSidewalkWork"><option></option><option>adding a new</option><option>replacing or repairing an existing</option></select> sidewalk.</p>';
var rowGutterText = '<p>There <select id="rowGutter"><option></option><option>is</option><option>is not</option></select> an existing curb or gutter with this sidewalk.</p>';
var rowSidewalkSizeText = '<p>The total size of the sidewalk is <input type="number" id="rowSidewalkSize" placeholder="0" min="1" step="10"> square feet.</p>';
var rowGutterLengthText = '<p>The total length of the curb or gutter is <input type="number" id="rowGutterLength" placeholder="0" min="1" step="10"> linear feet.</p>';
var rowDrivewayText = '<p>There <select id="rowDriveway"><option></option><option>is</option><option>is not</option></select> a driveway in this project.</p>';
var rowDrivewayNumText = '<p>There are <input type="number" id="rowAsphaltDrivewayNum" placeholder="0" min="1"> asphalt driveways.</p><p>There are <input type="number" id="rowConcreteDrivewayNum" placeholder="0" min="1"> concrete driveways.</p>';
var rowPavingText = '<p>The paved area totals <input type="number" id="rowPaving" placeholder="0" min="1"> square feet.</p>';
var rowTrenchTypeText = '<p>The trench is <select id="rowTrenchType"><option></option><option>an open cut trench</option><option>a monitoring well, a bore, or potholing</option></select>.</p>';
var rowTrenchLengthText = '<p>The total length of the trench is <input type="number" id="rowTrenchLength" placeholder="0" min="1" step="10"> linear feet.</p>';
var rowBoreCountText = '<p>There are <input type="number" placeholder="0" id="rowBoreCount" min="1"> bores (not including geotechnical or directional bores).</p>';
var rowUseDaysText = '<p>This project will use the right-of-way for <input type="number" id="rowUseDays" placeholder="0" min="1" step="7"> days.</p>';
var rowBannerText = '<p>There <select id="rowBanner"><option></option><option>will</option><option>will not</option></select> be a banner in this project.</p>';
var rowBannerBlocksText = '<p>This banner spans <input type="number" id="rowBannerBlocks" placeholder="0" min="1"> blocks.</p>';
var rowBannerInstallText = '<p>The banner will be installed by a <select id="rowBannerInstall"><option></option><option>city</option><option>private</option></select> contractor.</p>';
var rowSMVTypeText = '<p>This is <select id="rowSMVType"><option></option><option>an annual</option><option>a single trip</option><option>a house move</option><option>a heavy haul corridor</option></select> permit.</p>';
var rowTrenchText = '<p>There <select id="rowTrench"><option></option><option>will</option><option>will not</option></select> be a trench in this project.</p>';
var rowBoresText = '<p>There <select id="rowBores"><option></option><option>will</option><option>will not</option></select> be bores in this project.</p>';
var rowUseTypeText = '<p>The use of this permit is for <select id="rowUse"><option></option><option>a special motor vehicle</option><option>overtime parking</option><option>a banner</option></select>.</p>';
var rowHoliday = '<p><input type="checkbox" name="holiday" id="rowHoliday"><label for="rowHoliday">This use includes holiday decorations.</label></p>';
var pg1and2instructions = '<p><b>This fee estimator is intended for informational purposes only</b> and will help you estimate what your building permit fee will be.</p><p>Click on the <span class="underline">underlined blank spaces</span> in the sentences below to select from a dropdown menu of choices or enter a number value based off of what fits in the sentence.</p><p>Hover over <span class="green">green</span> question marks to get more information about the item next to the icon.</p><p>If you need help, click on the <span class="green">Technical Issues</span> button at the bottom of the page and describe the problem above the dotted line.</p>';
var pg3disclaimer = '<div class="disclaimer">This fee estimator is intended for informational purposes only, and currently available for limited permit types. Please note, complete identification of all required permits and final fee calculations will be completed during the processing of a permit application.</div>';
var permitFeeDetails = '<div class="fee-sub-items"><p class="base">Base permit fee:<span class="money"></span></p><span class="tooltip-wrapper last-page"><i class="fa fa-question tooltip-pointer" aria-hidden="true"></i><div class="tooltip"><div>The <b>base permit fee</b> includes the fees associated with the fields you filled out on the last page as well as the <b>Integrated Permit Management System (IPMS)</b> fees which helps fund the permit systems used city- and state-wide.</div></div></span><p class="esa">ESA fee:<span class="money"></span></p><span class="tooltip-wrapper last-page"><i class="fa fa-question tooltip-pointer" aria-hidden="true"></i><div class="tooltip"><div>The <b>Endangered Species Act (ESA)</b> uses these funds to make sure that any endangered species can be sustained and the funding exists at the federal level.</div></div></span><p class="smif">SMIF fee:<span class="money"></span></p><span class="tooltip-wrapper last-page"><i class="fa fa-question tooltip-pointer" aria-hidden="true"></i><div class="tooltip"><div>The <b>Strong Motion Instrumentation Fees (SMIF)</b> are what funds strong-motion instruments to collect geologic data throughout the city.</div></div></span><p class="state">State building fee:<span class="money"></span></p><span class="tooltip-wrapper last-page"><i class="fa fa-question tooltip-pointer" aria-hidden="true"></i><div class="tooltip"><div>The <b>state building fee</b> is collected to help fund the building code council at the state level.</div></div></span><p class="review">Plan review fee:<span class="money"></span></p><span class="tooltip-wrapper last-page"><i class="fa fa-question tooltip-pointer" aria-hidden="true"></i><div class="tooltip"><div>The <b>plan review fee</b> covers the expenses for a building planner to go over the permit and approve it.</div></div></span></div>';
$(document).on('click', '.back', function() {
  back();
});
$(document).on('click', '.next', function() {
  next();
});
$(document).on('click', '#feedback', function() {
  var feedback = "mailto:tacomapermits@cityoftacoma.org?subject=Problems using the fee estimator&body=%0D%0A%0D%0A----- Leave your comments above. Do not edit beneath this line -----%0D%0A%0D%0A";
  for(var i in permits) {
    if(permits[i] == "bld") {
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
    } else if(permits[i] == "plm") {
      feedback += "%0D%0A%0D%0APlumbing Permit:%0D%0AFixtures: " + $('#pgplm .fixtureQuantity').val();
    } else if(permits[i] == "sewer") {
      feedback += "%0D%0A%0D%0ASewer Permit:%0D%0ABarricade days: " + $('#pgsewer .daysForBarricade').val() + "%0D%0ARight-of-way: " + $('#pgsewer rowRestoration').val() + "%0D%0AConnection type: " + $('#pgsewer .connectionType').val();
    } else if(permits[i] == "wtr") {
      feedback += "%0D%0A%0D%0AWater Permit:%0D%0ABarricade days: " + $('#pgwtr .daysForBarricade').val() + "%0D%0AConnection type: " + $('#pgwtr .connectionType').val();
    } else if(permits[i] == "storm") {
      feedback += "%0D%0A%0D%0AStorm Permit:%0D%0ABarricade days: " + $('#pgstorm .daysForBarricade').val() + "%0D%0ARight-of-way: " + $('#pgstorm .rowRestoration').val() + "%0D%0ADischarge point: " + $('#pgstorm .dischargePoint').val();
    } else if(permits[i] == "sitedev") {
      feedback += "%0D%0A%0D%0ASite Development:%0D%0ACut area: " + $('.cutArea').val() + "%0D%0AFill area: " + $('#fillArea').val() + "%0D%0AClearing area: " + $('#clearingArea').val() + "%0D%0APaved area: " + $('#pavedArea').val();
    } else if(permits[i] == "demo") {
      feedback += "%0D%0A%0D%0ADemolition:%0D%0AStructure type: " + $('#demoType').val() + "%0D%0ATotal area: " + $('#demoArea').val() + "%0D%0ATotal value: " + $('#demoCost').val();
    } else if(permits[i] == "sign") {
      feedback += "%0D%0A%0D%0ASign:%0D%0ACost: " + $('#signCost').val();
    } else if(permits[i] == "land") {
      if(useRows.length == 0) {
        useRows.push($('#luPermitType').val(), $('#luPermitSubtype').val());
      }
      for(var i = 0; i < useRows.length; i += 2) {
        feedback += "%0D%0ALand Use #" + ((i + 2) / 2) + ": %0D%0ACategory: " + useRows[i] + "%0D%0ASubcategory: " + useRows[i + 1];
      }
    } else if(permits[i] == "fire") {
      feedback += "%0D%0AFire boxes: ";
      $.each($('#pgfire input'), function() {
        if($(this).val() > 0) {
          feedback += $(this).val() + ", ";
        } else {
          feedback += "empty, ";
        }
      });
    } else if(permits[i] == "event") {
      feedback += "%0D%0AEvent:%0D%0AResidential or commercial: " + $('#eventOrgType').val() + "%0D%0AEstimated attendance: " + $('#eventAttendance').val() + "%0D%0AEvent date: " + $('#eventDate').val();
    } else if(permits[i] == "row") {
      feedback += "%0D%0AROW:%0D%0AProject Type: " + $('#rowType').val();
      if ($('#rowType').val() == "construction on") {
        feedback += "%0D%0ASidewalk work: " + $('#rowSidewalkWork').val();
        if ($('#rowSidewalkWork').val() == "adding a new") {
          feedback += "%0D%0AGutter: " + $('#rowGutter').val();
          if ($('#rowGutter').val() == "is") {
            feedback += "%0D%0AGutter length: " + $('#rowGutterLength').val();
          }
        }
        feedback += "%0D%0ASidewalk size: " + $('#rowSidewalkSize').val();
        if ($('#rowDriveway').val() == "is") {
          feedback += "%0D%0AAsphalt driveways: " + $('#rowAsphaltDrivewayNum').val() + "%0D%0AConcrete driveways: " + $('#rowConcreteDrivewayNum').val();
        }
        feedback += "%0D%0APaved area: " + $('#rowPaving').val() + "%0D%0ATrench type: " + $('#rowTrenchType').val();
        if ($('#rowTrenchType').val() == "an open cut trench") {
          feedback += "%0D%0ATrench length: " + $('#rowTrenchLength').val();
        } else if ($('#rowTrenchType').val() == "a monitoring well, a bore, or potholing") {
          feedback += "%0D%0ABore count: " + $('#rowBoreCount').val();
        }
      } else if ($('#rowType').val() == "use of") {
        feedback += "%0D%0AUse days: " + $('#rowUseDays').val() + "%0D%0ABanner: " + $('#rowBanner').val();
        if ($('#rowBanner').val() == "will") {
          feedback += "%0D%0ABanner install: " + $('#rowBannerInstall').val() + "%0D%0ABanner blocks: " + $('#rowBannerBlocks').val();
        }
        feedback += "%0D%0ASMV: " + $('#rowSMV').val();
        if ($('#rowSMV').val() == "will") {
          feedback += "%0D%0ASMV type: " + $('#rowSMVType').val();
        }
      } else if ($('#rowType').val() == "utility work in") {
        if ($('#rowTrench').val() == "will") {
          feedback += "%0D%0ATrench length: " + $('#rowTrenchLength').val();
        }
        if ($('#rowBores').val() == "will") {
          feedback += "%0D%0ABore count: " + $('#rowBoreCount').val();
        }
      }
      feedback += "%0D%0ABarricade days: " + $('#pgrow .daysForBarricade').val();
    }
  }
  feedback += "%0D%0A%0D%0AApp Version: v5.0.0";
  var w = window.open(feedback);
  setTimeout(function() {
    w.close();
  }, 100);
});
$(document).on('click', '.description-expand', function() {
  $('.description').toggleClass('open');
});
$(document).on('click', '.fee-item header', function() {
  $(this).siblings('.fee-sub-items').toggleClass('open');
  $(this).children('.fa-caret-right').toggleClass('open');
});
$(document).on('click', 'h4', function() {
  $(this).children('i').toggleClass('open');
  $(this).siblings('.permit-category').toggleClass('open');
});
$(document).on('click', 'button', function(e) {
  e.preventDefault();
});
$(document).keydown(function(e) {
  if(e.keyCode == 37) { // left
    back();
  } else if(e.keyCode == 39 || e.keyCode == 13 || e.keyCode == 32) { // right arrow, enter, spacebar
    next();
  }
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
    if($(this).val() == "will") {
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
    if($(this).val() == "will") {
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
    if($(this).val() == "will") {
      putIn($('#pgsewer .q3'), barricadeDaysText);
    } else {
      takeOut($('#pgsewer .q3'));
    }
  });
}
function sitedevPermit() {
  $('#pgsitedev .question').hide();
  putIn($('#pgsitedev h3'), "Site Development");
  putIn($('#pgsitedev .q1'), clearingOrGrading);
  putIn($('#pgsitedev .q3'), pavedAreaText);
  $('.clearingOrGrading').change(function() {
    if($('.clearingOrGrading').val() == "clearing") {
      putIn($('#pgsitedev .q2'), clearingAreaText);
    } else if($('.clearingOrGrading').val() == "grading") {
      putIn($('#pgsitedev .q2'), cutAndFillText);
    } else {
      takeOut($('#pgsitedev .q2'));
    }
  });
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
  $('#demoType').change(function() {
    if($(this).val() == "residential") {
      putIn($('#pgdemo .q2'), demoAccText);
    } else {
      takeOut($('#pgdemo .q2'));
    }
    $('#demoAcc').change(function() {
      if($(this).val() == "is") {
        putIn($('#pgdemo .q3'), demoAccPlmText);
      } else {
        takeOut($('#pgdemo .q3'));
      }
    });
  });
  putIn($('#pgdemo .q4'), demoAreaText);
}
function landPermit() {
  useRows = [];
  $('#pgland .question').hide();
  putIn($('#pgland h3'), "Land Use");
  putIn($('#pgland .q1'), luPermitTypeText);
  putIn($('#pgland .q5'), luAddText);
  $('#luPermitType').change(function() {
    if($(this).val() == "" || $(this).val() == "extension of permit" || $(this).val() == "site approval" || $(this).val() == "temporary homeless camp") {
      takeOut($('#pgland .q2'));
    } else if($(this).val() == "accessory dwelling unit") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + accDwellingSubtypeText + ".</p>");
    } else if($(this).val() == "conditional use") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + condUseSubtypeText + ".</p>");
    } else if($(this).val() == "critical areas") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + critAreaSubtypeText + ".</p>");
    } else if($(this).val() == "environmental review") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + envRevSubtypeText + ".</p>");
    } else if($(this).val() == "information request") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + infReqSubtypeText + ".</p>");
    } else if($(this).val() == "major modification of permit") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + majModSubtypeText + ".</p>");
    } else if($(this).val() == "plats / short plats / boundary line adjustments") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + platsSubtypeText + ".</p>");
    } else if($(this).val() == "shoreline") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + shoreSubtypeText + ".</p>");
    } else if($(this).val() == "site rezone") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + siteRezSubtypeText + ".</p>");
    } else if($(this).val() == "variance") {
      putIn($('#pgland .q2'), "<p>The related subcategory is " + varSubtypeText + ".</p>");
    }
    takeOut($('#pgland .q3'));
    $('#luPermitSubtype').change(function() {
      if($('#luPermitType').val() == "plats / short plats / boundary line adjustments" && $(this).val() == "preliminary plat") {
        putIn($('#pgland .q3'), plats3rdQuestText);
        $('#thirdQuest').change(function() {
          lots = $(this).val();
        });
      } else if($('#luPermitType').val() == "shoreline" && $(this).val() == "other than single-family") {
        putIn($('#pgland .q3'), shore3rdQuestText);
        $('#thirdQuest').change(function() {
          shoreval = $(this).val();
        });
      } else {
        takeOut($('#pgland .q3'));
      }
    });
  });
  $('#luAdd').click(function() {
    var addToTable = false;
    if($('#luPermitType').val() == "extension of permit" || $('#luPermitType').val() == "site approval" || $('#luPermitType').val() == "temporary homeless camp") {
      useRows.push($('#luPermitType').val(), "");
      addToTable = true;
    } else if($('#luPermitType').val() != "" && $('#luPermitSubtype').val() != "") {
      useRows.push($('#luPermitType').val(), $('#luPermitSubtype').val());
      addToTable = true;
    } else if($('#luPermitType').val() == "" || $('#luPermitSubtype').val() == "") {
      addToTable = false;
      showError($(this), $('#luPermitType, #luPermitSubtype, #pgland .q3 input'));
    }
    if(addToTable) {
      putIn($('#pgland .q4'), "<table id=\"useTable\"><tr><th>Use type:</th><th>Subtype:</th></tr></table>");
      for(i = 0; i < useRows.length; i += 2) {
        $('#useTable').append("<tr><td>" + useRows[i] + "</td><td>" + useRows[i + 1] + "</td></tr>");
      }
      $('#luPermitType').val('');
      takeOut($('#pgland .q2, #pgland .q3'));
    }
  });
}
function firePermit() {
  $('#pgfire .question').hide();
  putIn($('#pgfire h3'), "Fire");
  putIn($('#pgfire .q1'), fireCategoriesText);
  $('#fireCategories').change(function() {
    if($(this).val() == "fire alarms") {
      putIn($('#pgfire .q2'), fireAlarmText);
    } else if($(this).val() == "pre-engineered systems") {
      putIn($('#pgfire .q2'), firePreEngText);
    } else if($(this).val() == "kitchen hood suppression systems") {
      putIn($('#pgfire .q2'), fireKitchenText);
    } else if($(this).val() == "private fire service mains and their appurtenances") {
      putIn($('#pgfire .q2'), fireServMainsText);
    } else if($(this).val() == "fire sprinkler tenant improvement") {
      putIn($('#pgfire .q2'), fireSprinklerText);
    } else if($(this).val() == "new water based fire suppression systems") {
      putIn($('#pgfire .q2'), fireSuppressionText);
    } else {
      takeOut($('#pgfire .q2'));
    }
  });
}
function eventPermit() {
  $('#pgevent .question').hide();
  putIn($('#pgevent h3'), "Special Event");
  putIn($('#pgevent .q1'), eventTypeText);
  putIn($('#pgevent .q2'), eventAttendanceText);
  putIn($('#pgevent .q3'), eventDateText);
  var today = new Date();
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if(dd < 10) dd = '0' + dd;
  if(mm < 10) mm = '0' + mm;
  today = yyyy + "-" + mm + "-" + dd;
  $('input[type="date"]').attr("min", today);
}
function rowPermit() {
  $('#pgrow .question').hide();
  putIn($('#pgrow h3'), "Right-of-Way");
  putIn($('#pgrow .q1'), rowTypeText);
  putIn($('#pgrow .q2'), barricadeIfText);
  $('#pgrow .barricadeIf').change(function() {
    if ($(this).val() == "will") {
      putIn($('#pgrow .q3'), barricadeDaysText);
    } else {
      takeOut($('#pgrow .q3'));
    }
  });
  $('#rowType').change(function() {
    takeOut($('#pgrow .q4, #pgrow .q5, #pgrow .q6, #pgrow .q7, #pgrow .q8, #pgrow .q9, #pgrow .q10, #pgrow .q11'));
    if($(this).val() == "construction on") {
      putIn($('#pgrow .q4'), rowConstructionTypeText);
      $('#rconSidewalk').change(function() {
        if($(this).is(':checked')) {
          putIn($('#pgrow .q5'), rowSidewalkWorkText);
          putIn($('#pgrow .q6'), rowSidewalkSizeText);
        } else {
          takeOut($('#pgrow .q5, #pgrow .q6'));
        }
      });
      $('#rconDriveway').change(function() {
        if($(this).is(':checked')) {
          putIn($('#pgrow .q7'), rowDrivewayNumText);
        } else {
          takeOut($('#pgrow .q7'));
        }
      });
      $('#rconCurb').change(function() {
        if($(this).is(':checked')) {
          putIn($('#pgrow .q8'), rowGutterLengthText);
        } else {
          takeOut($('#pgrow .q8'));
        }
      });
      $('#rconTrenchBore').change(function() {
        if($(this).is(':checked')) {
          putIn($('#pgrow .q9'), rowTrenchTypeText);
          $('#rowTrenchType').change(function() {
            if($(this).val() == "an open cut trench") {
              putIn($('#pgrow .q10'), rowTrenchLengthText);
            } else if($(this).val() == "a monitoring well, a bore, or potholing") {
              putIn($('#pgrow .q10'), rowBoreCountText);
            } else {
              takeOut($('#pgrow .q10'));
            }
          });
        } else {
          takeOut($('#pgrow .q9, #pgrow .q10'));
        }
      });
      putIn($('#pgrow .q11'), rowPavingText);
    } else if($(this).val() == "use of") {
      putIn($('#pgrow .q4'), rowUseTypeText);
      putIn($('#pgrow .q7'), rowHoliday);
      $('#rowUse').change(function() {
        takeOut($('#pgrow .q5, #pgrow .q6'));
        if ($(this).val() == "a special motor vehicle") {
          putIn($('#pgrow .q5'), rowSMVTypeText);
        } else if ($(this).val() == "overtime parking") {
          putIn($('#pgrow .q5'), rowUseDaysText);
        } else if ($(this).val() == "a banner") {
          putIn($('#pgrow .q5'), rowBannerBlocksText);
          putIn($('#pgrow .q6'), rowBannerInstallText);
        }
      });
    } else if($(this).val() == "utility work in") {
      putIn($('#pgrow .q4'), rowTrenchText);
      $('#rowTrench').change(function() {
        if($(this).val() == "will") {
          putIn($('#pgrow .q5'), rowTrenchLengthText);
        } else {
          takeOut($('#pgrow .q5'));
        }
      });
      putIn($('#pgrow .q6'), rowBoresText);
      $('#rowBores').change(function() {
        if($(this).val() == "will") {
          putIn($('#pgrow .q7'), rowBoreCountText);
        } else {
          takeOut($('#pgrow .q7'));
        }
      });
    }
  });
}
function back() {
  if ($('.question-box.active').attr('id') == "pglast") {
    readyForLastPage = false;
    currentPermit = permits[permits.length - 1];
    $('#pgmid-pointer').removeClass('post');
    $('.description').removeClass('open').removeClass('disclaimer').html(pg1and2instructions);
    $('#pglast, .tab-links li').removeClass('active');
    $('#pg' + currentPermit + ', #pgmid-pointer').addClass('active');
  } else if ($('.question-box.active').attr('id') == "pgbld") {
    backPermit("bld");
  } else if ($('.question-box.active').attr('id') == "pgplm") {
    backPermit("plm");
  } else if ($('.question-box.active').attr('id') == "pgsewer") {
    backPermit("sewer");
  } else if ($('.question-box.active').attr('id') == "pgwtr") {
    backPermit("wtr");
  } else if ($('.question-box.active').attr('id') == "pgstorm") {
    backPermit("storm");
  } else if ($('.question-box.active').attr('id') == "pgsitedev") {
    backPermit("sitedev");
  } else if ($('.question-box.active').attr('id') == "pgsign") {
    backPermit("sign");
  } else if ($('.question-box.active').attr('id') == "pgdemo") {
    backPermit("demo");
  } else if ($('.question-box.active').attr('id') == "pgland") {
    backPermit("land");
  } else if ($('.question-box.active').attr('id') == "pgfire") {
    backPermit("fire");
  } else if ($('.question-box.active').attr('id') == "pgevent") {
    backPermit("event");
  } else if ($('.question-box.active').attr('id') == "pgrow") {
    backPermit("row");
  }
}
function next() {
  if ($('.question-box.active').attr('id') == "pgbld") {
    bldPageNext();
  } else if ($('.question-box.active').attr('id') == "pgplm") {
    plmPageNext();
  } else if ($('.question-box.active').attr('id') == "pgsewer") {
    sewerPageNext();
  } else if ($('.question-box.active').attr('id') == "pgwtr") {
    wtrPageNext();
  } else if ($('.question-box.active').attr('id') == "pgstorm") {
    stormPageNext();
  } else if ($('.question-box.active').attr('id') == "pgsitedev") {
    sitePageNext();
  } else if ($('.question-box.active').attr('id') == "pgsign") {
    signPageNext();
  } else if ($('.question-box.active').attr('id') == "pgdemo") {
    demoPageNext();
  } else if ($('.question-box.active').attr('id') == "pgland") {
    landPageNext();
  } else if ($('.question-box.active').attr('id') == "pgfire") {
    firePageNext();
  } else if ($('.question-box.active').attr('id') == "pgevent") {
    eventPageNext();
  } else if ($('.question-box.active').attr('id') == "pgrow") {
    rowPageNext();
  } else if ($('.question-box.active').attr('id') == "pgfirst") {
    firstPageNext();
  } else if ($('.question-box.active').attr('id') == "pglast") {
    lastPageNext();
  }
}
function firstPageNext() {
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
  if($('#fireCheck').is(':checked')) {
    permits.push("fire");
    console.log("Ding!");
  }
  if($('#eventCheck').is(':checked')) {
    permits.push("event");
  }
  if($('#rowCheck').is(':checked')) {
    permits.push("row");
  }
  if($('input[type="checkbox"]').is(':checked')) {
    $('.description').removeClass('open');
    $('#pgfirst, .tab-links li').removeClass('active');
    $('#pgfirst-pointer').addClass('post');
    $('#details-num').text(" (1/" + permits.length + ")");
    for(var i in permits) {
      if(i == 0) {
        activePermit = permits[i];
      }
      if(permits[i] == "bld") {
        $('<article id=\"pgbld\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgbld').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgbld .question').hide();
      } else if(permits[i] == "plm") {
        $('<article id=\"pgplm\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgplm').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgplm .question').hide();
      } else if(permits[i] == "sewer") {
        $('<article id=\"pgsewer\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgsewer').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgsewer .question').hide();
      } else if(permits[i] == "wtr") {
        $('<article id=\"pgwtr\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgwtr').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgwtr .question').hide();
      } else if(permits[i] == "storm") {
        $('<article id=\"pgstorm\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgstorm').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgstorm .question').hide();
      } else if(permits[i] == "sitedev") {
        $('<article id=\"pgsitedev\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgsitedev').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgsitedev .question').hide();
      } else if(permits[i] == "sign") {
        $('<article id=\"pgsign\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgsign').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgsign .question').hide();
      } else if(permits[i] == "demo") {
        $('<article id=\"pgdemo\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgdemo').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgdemo .question').hide();
      } else if(permits[i] == "land") {
        $('<article id=\"pgland\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgland').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgland .question').hide();
      } else if(permits[i] == "fire") {
        $('<article id=\"pgfire\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgfire').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgfire .question').hide();
      } else if(permits[i] == "event") {
        $('<article id=\"pgevent\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgevent').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgevent .question').hide();
      } else if(permits[i] == "row") {
        $('<article id=\"pgrow\" class=\"question-box\"></article>').insertBefore('#pglast');
        $('#pgrow').html(basicPage);
        $('#pgmid-pointer').addClass('active');
        $('#pgrow .question').hide();
      }
    }
    if(activePermit == "bld") {
      $('#pgbld').addClass('active');
      bldPermit();
    } else if(activePermit == "plm") {
      $('#pgplm').addClass('active');
      plmPermit();
    } else if(activePermit == "sewer") {
      $('#pgsewer').addClass('active');
      sewerPermit();
    } else if(activePermit == "wtr") {
      $('#pgwtr').addClass('active');
      wtrPermit();
    } else if(activePermit == "storm") {
      $('#pgstorm').addClass('active');
      stormPermit();
    } else if(activePermit == "sitedev") {
      $('#pgsitedev').addClass('active');
      sitedevPermit();
    } else if(activePermit == "sign") {
      $('#pgsign').addClass('active');
      signPermit();
    } else if(activePermit == "demo") {
      $('#pgdemo').addClass('active');
      demoPermit();
    } else if(activePermit == "land") {
      $('#pgland').addClass('active');
      landPermit();
    } else if(activePermit == "fire") {
      $('#pgfire').addClass('active');
      firePermit();
    } else if(activePermit == "event") {
      $('#pgevent').addClass('active');
      eventPermit();
    } else if(activePermit == "row") {
      $('#pgrow').addClass('active');
      rowPermit();
    }
  } else {
    showError($(this), $('#pgfirst input'));
  }
}
function bldPageNext() {
  readyforNextPage = false;
  if(projectType == "RN" || projectType == "RA") {
    if($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
      $.each($('#pgbld .q3 input'), function() {
        if($(this).val()) {
          readyforNextPage = true;
        }
      });
    } else if($('#structureType').val() == "an accessory structure") {
      if($('#garageCheck').is(':checked') && $('#garageArea').val() > 0) {
        readyforNextPage = true;
      }
      if($('#carportCheck').is(':checked') && $('#carportArea').val() > 0) {
        readyforNextPage = true;
      }
      if($('#otherCheck').is(':checked') && $('#otherArea').val() > 0) {
        readyforNextPage = true;
      }
    }
    if(readyforNextPage) {
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
    if($('#remodelCost').val()) {
      readyforNextPage = true;
    } else {
      showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
    }
    if(readyforNextPage) {
      remodelCost = $('#remodelCost').val();
    }
  } else if(projectType == "CN" || projectType == "CA") {
    if($('#pgbld input, #pgbld select').val()) {
      numUnits += parseInt($('#units').val());
      if(occupRows.length > 0) {
        if($('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
          occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
        }
        readyforNextPage = true;
      } else if(occupRows.length == 0 && $('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
        occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
        readyforNextPage = true;
      }
    } else {
      showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
    }
  } else if(projectType == "RB") {
    if($('#remodelCost').val()) {
      if($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
        $.each($('#pgbld .q3 input'), function() {
          if($(this).val()) {
            readyforNextPage = true;
          }
        });
      } else if($('#structureType').val() == "an accessory structure") {
        if($('#garageCheck').is(':checked') && $('#garageArea').val() > 0) {
          readyforNextPage = true;
        }
        if($('#carportCheck').is(':checked') && $('#carportArea').val() > 0) {
          readyforNextPage = true;
        }
        if($('#otherCheck').is(':checked') && $('#otherArea').val() > 0) {
          readyforNextPage = true;
        }
      }
    }
    if(readyforNextPage) {
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
      if($('#remodelCost').val()) {
        numUnits += parseInt($('#units').val());
        if(occupRows.length > 0) {
          if($('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
            occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
          }
          readyforNextPage = true;
        } else if(occupRows.length == 0 && $('#occupCat').val() != "" && $('#constructionType').val() != "" && cnArea.val() > 0) {
          occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
          readyforNextPage = true;
        }
      } else {
        showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
      }
    } else {
      showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
    }
  }
  if(readyforNextPage) {
    if(permits[permits.length - 1] == "bld") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("bld", permits) + 1];
      $('#pgbld').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  }
}
function wtrPageNext() {
  if($('#pgwtr .barricadeIf').val() == "will") {
    if($('#pgwtr .daysForBarricade').val() > 0 && $('#pgwtr .connectionType').val()) {
      readyforNextPage = true;
    } else {
      showError($('#pgwtr .next'), $('#pgwtr .daysForBarricade, #pgwtr .connectionType'));
    }
  } else if($('#pgwtr .barricadeIf').val() == "will not" && $('#pgwtr .connectionType').val() != "") {
    readyforNextPage = true;
  } else {
    showError($('#pgwtr .next'), $('#pgwtr .daysForBarricade, #pgwtr .connectionType'));
  }
  if(readyforNextPage) {
    if(permits[permits.length - 1] == "wtr") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("wtr", permits) + 1];
      $('#pgwtr').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  }
}
function plmPageNext() {
  readyforNextPage = false;
  if($('#pgplm .fixtureQuantity').val()) {
    readyforNextPage = true;
  }
  if(readyforNextPage) {
    if(permits[permits.length - 1] == "plm") {
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
}
function stormPageNext() {
  if($('#pgstorm .rowRestoration').val() == "will") {
    if($('#pgstorm .daysForBarricade').val() > 0 && $('#pgstorm .dischargePoint').val()) {
      readyforNextPage = true;
    }
  } else if($('#pgstorm .rowRestoration').val() == "will not" && $('#pgstorm .dischargePoint').val() != "") {
    readyforNextPage = true;
  } else {
    showError($('#pgstorm .next'), $('#pgstorm input'));
  }
  if(readyforNextPage) {
    if(permits[permits.length - 1] == "storm") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("storm", permits) + 1];
      $('#pgstorm').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  }
}
function sewerPageNext() {
  if($('#pgsewer .rowRestoration').val() == "will") {
    if($('#pgsewer .daysForBarricade').val() > 0 && $('#pgsewer .connectionType').val()) {
      readyforNextPage = true;
    }
  } else if($('#pgsewer .rowRestoration').val() == "will not" && $('#pgsewer .connectionType').val() != "") {
    readyforNextPage = true;
  } else {
    showError($('#pgsewer .next'), $('#pgsewer input, #pgsewer select'));
  }
  if(readyforNextPage) {
    if(permits[permits.length - 1] == "sewer") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("sewer", permits) + 1];
      $('#pgsewer').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  }
}
function sitePageNext() {
  readyforNextPage = false;
  if($('.clearingOrGrading').val() != "" && $('#pgsitedev .q2 input').val() != "") {
    if(permits[permits.length - 1] == "sitedev") {
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
}
function signPageNext() {
  if($('#signCost').val()) {
    if(permits[permits.length - 1] == "sign") {
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
}
function demoPageNext() {
  if($('#pgdemo input, #pgdemo select').val()) {
    if(permits[permits.length - 1] == "demo") {
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
}
function landPageNext() {
  readyforNextPage = false;
  if($('#pgland select').val()) {
    if($('#luPermitType').val() == "extension of permit" || $('#luPermitType').val() == "site approval" || $('#luPermitType').val() == "temporary homeless camp") {
      useRows.push($('#luPermitType').val(), "");
      readyforNextPage = true;
    } else {
      useRows.push($('#luPermitType').val(), $('#luPermitSubtype').val());
      readyforNextPage = true;
    }
  } else if(useRows.length > 0) {
    readyforNextPage = true;
  }
  if($('#pgland select').val() || useRows.length > 0) {
    if($('#luPermitType').val() != "" && $('#luPermitSubtype').val() != "") {}
  }
  if(readyforNextPage) {
    if(permits[permits.length - 1] == "land") {
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
}
function firePageNext() {
  if($('#fireCategories').val()) {
    $.each($('#pgfire input'), function() {
      if($(this).val() > 0) {
        readyforNextPage = true;
      }
    });
  }
  if($('#fireCategories').val() == "smoke control systems") {
    readyforNextPage = true;
  }
  if(readyforNextPage) {
    if(permits[permits.length - 1] == "fire") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("fire", permits) + 1];
      $('#pgfire').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  } else {
    showError($('#pgfire .next'), $('#pgfire input, #pgfire select'));
  }
}
function eventPageNext() {
  if ($('#eventOrgType').val() != "" && $('#eventAttendance').val() != "" && $('#eventDate').val() != "") {
    if(permits[permits.length - 1] == "event") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("event", permits) + 1];
      $('#pgevent').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  } else {
    showError($('#pgevent .next'), $('#pgevent input, #pgevent select'));
  }
}
function rowPageNext() {
  var flag = [];
  if ($('#pgrow .barricadeIf').val() == "will") {
    if ($('#pgrow .daysForBarricade').val() != "") {
      flag.push(true);
    } else {
      flag.push(false);
    }
  }
  if ($('#rowType').val() == "construction on") {
    if($('#rconSidewalk').is(':checked')) {
      if ($('#rowSidewalkWork').val() != "") {
        flag.push(true);
      } else {
        flag.push(false);
      }
      if ($('#rowSidewalkSize').val() != "") {
        flag.push(true);
      } else {
        flag.push(false);
      }
    }
    if($('#rconDriveway').is(':checked')) {
      if ($('#rowDriveway').val() == "is") {
        if ($('#rowAsphaltDrivewayNum').val() != "" || $('#rowConcreteDrivewayNum').val() != "") {
          flag.push(true);
        } else {
          flag.push(false);
        }
      }
    }
    if($('#rconCurb').is(':checked')) {
      if ($('#rowGutterLength').val() != "") {
        flag.push(true);
      } else {
        flag.push(false);
      }
    }
    if($('#rconTrenchBore').is(':checked')) {
      if ($('#rowTrenchType').val() == "an open cut trench") {
        if ($('#rowTrenchLength').val() != "") {
          flag.push(true);
        } else {
          flag.push(false);
        }
      } else if ($('#rowTrenchType').val() == "a monitoring well, a bore,or potholing") {
        if ($('#rowBoreCount').val() != "") {
          flag.push(true);
        } else {
          flag.push(false);
        }
      }
    }
    if ($('#rowPaving').val() != "") {
      flag.push(true);
    } else {
      flag.push(false);
    }
  } else if($('#rowType').val() == "use of") {
    if ($('#rowUse').val() == "a special motor vehicle") {
      if ($('#rowSMVType').val() != "") {
        flag.push(true);
      } else {
        flag.push(false);
      }
    } else if ($('#rowUse').val() == "overtime parking") {
      if ($('#rowUseDays').val() != "") {
        flag.push(true);
      } else {
        flag.push(false);
      }
    } else if ($('#rowUse').val() == "a banner") {
      if ($('#rowBanner').val() == "will") {
        if ($('#rowBannerBlocks').val() != "" && $('#rowBannerInstall').val() != "") {
          flag.push(true);
        } else {
          flag.push(false);
        }
      }
    }
  } else if($('#rowType').val() == "utility work in") {
    if ($('#rowTrench').val() == "will") {
      if ($('#rowTrenchLength').val() != "") {
        flag.push(true);
      } else {
        flag.push(false);
      }
    }
    if ($('#rowBores').val() == "will") {
      if ($('#rowBoreCount').val() != "") {
        flag.push(true);
      } else {
        flag.push(false);
      }
    }
  } else {
    flag.push(false);
  }
  readyforNextPage = true;
  for (var i = 0; i < flag.length; i++) {
    if (flag[i] === false) {
      readyforNextPage = false;
      break;
    }
  }
  if(readyforNextPage) {
    if(permits[permits.length - 1] == "row") {
      finalPage();
    } else {
      currentPermit = permits[$.inArray("row", permits) + 1];
      $('#pgrow').removeClass('active');
      $('#pg' + currentPermit).addClass('active');
      nextPermit(currentPermit);
    }
  } else {
    showError($('#pgrow .next'), $('#pgrow input, #pgrow select'));
  }
}
function lastPageNext() {
  readyForLastPage = false;
  $('.description').addClass('open').removeClass('disclaimer').html(pg1and2instructions);
  $('#pglast, .tab-links li').removeClass('active').removeClass('post');
  $('#pgfirst, #pgfirst-pointer').addClass('active');
  $('#details-num').text("");
}
function finalPage() {
  $('.fee-details').html("");
  for(var i in permits) {
    if(permits[i] == "bld") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"bldPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Building</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "wtr") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"wtrPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Water</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "plm") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"plmPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Plumbing</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "storm") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"stormPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Surfacewater</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "sewer") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"sewerPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Wastewater</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "sitedev") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"sitedevPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Site Development</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "sign") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"signPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Sign</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "demo") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"demoPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Demolition</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "land") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"landPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Land Use</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "fire") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"firePermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Fire</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "event") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"eventPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Special Events</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    } else if(permits[i] == "row") {
      $('.fee-details').append("<section class=\"fee-item\" id=\"rowPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Right-of-Way</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
    }
  }
  finalCalculation();
  $('#pgmid-pointer').addClass('post');
  $('.question-box, .tab-links li').removeClass('active');
  $('#pglast, #pglast-pointer').addClass('active');
  $('.description').addClass('open').addClass('disclaimer').html(pg3disclaimer);
}
function finalCalculation() {
  grandTotal = 0;
  for(var i in permits) {
    valuation = 0;
    permitFee = 0;
    esaFee = 0;
    smifFee = 0;
    stateFee = 0;
    planRevFee = 0;
    total = 0;
    if(permits[i] == "bld") {
      if(projectType == "RN" || projectType == "RA" || projectType == "RB") {
        valuation = 113.85;
      }
      for(i = 0; i < occupRows.length; i += 3) {
        if(occupRows[i + 1] == "IA") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 229.26;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 210.11;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 179.28;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 178.28;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 212.12;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 176.94;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 209.11;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 182.98;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 194.27;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 109.64;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 108.64;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 102.63;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 102.63;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 182.98;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 183.95;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 307.93;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 213.36;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 208.19;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 183.95;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 133.57;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 185.63;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 155.74;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 145.23;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 183.95;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 101.63;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 100.63;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 78.63;
          }
        } else if(occupRows[i + 1] == "IB") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 221.37;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 202.22;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 174.08;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 173.08;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 204.22;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 169.04;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 201.22;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 176.21;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 187.38;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 104.6;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 103.6;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 97.58;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 97.58;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 176.21;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 177.72;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 301.16;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 206.59;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 201.43;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 177.72;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 128.37;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 197.39;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 149.5;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 141.28;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 177.72;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 96.58;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 95.58;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 74.24;
          }
        } else if(occupRows[i + 1] == "IIA") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 216.01;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 196.86;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 169.68;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 167.68;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 198.87;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 162.69;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 194.86;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 170.4;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 182;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 98.57;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 98.57;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 92.55;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 92.55;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 170.4;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 172.57;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 295.62;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 200.78;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 195.62;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 172.57;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 122.97;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 174.24;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 144.35;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 137.64;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 172.57;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 90.55;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 90.55;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 69.76;
          }
        } else if(occupRows[i + 1] == "IIB") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 207.16;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 188.01;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 162.81;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 161.81;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 190.01;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 154.83;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 187.01;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 161.91;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 173.88;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 94.77;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 93.77;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 87.75;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 87.75;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 161.91;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 165.3;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 286.86;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 192.29;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 187.12;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 165.3;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 117.1;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 166.97;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 137.09;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 134.18;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 165.3;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 86.75;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 85.75;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 66.2;
          }
        } else if(occupRows[i + 1] == "IIIA") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 194.94;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 175.94;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 153.48;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 151.48;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 178.14;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 141.96;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 173.94;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 147.69;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 162.37;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 85.03;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 85.03;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 79.22;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 79.22;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 147.69;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 152.29;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 271.68;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 179.07;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 174.39;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 152.29;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 107.27;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 153.72;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 124.57;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 129.27;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 152.29;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 77.22;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 77.22;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 59.84;
          }
        } else if(occupRows[i + 1] == "IIIB") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 189.29;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 170.29;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 149.24;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 148.24;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 172.49;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 137.3;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 169.29;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 142.14;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 154.12;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 81.17;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 80.17;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 74.36;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 74.36;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 142.14;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 148.15;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation = 0;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation = 0;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 167.85;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 148.15;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 104.03;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 149.58;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 120.43;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 125.87;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 148.15;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 73.36;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 72.36;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 55.88;
          }
        } else if(occupRows[i + 1] == "IV") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 200.61;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 181.46;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 157.08;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 156.08;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 183.47;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 148.28;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 180.46;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 155.55;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 167.88;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 90.78;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 89.78;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 83.76;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 83.76;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 155.55;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 165.39;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 280.5;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 185.93;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 180.76;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 165.39;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 111.38;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 167.06;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 137.17;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 131.94;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 165.39;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 82.76;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 81.76;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 63.23;
          }
        } else if(occupRows[i + 1] == "VA") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 178;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 158.99;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 138.97;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 136.97;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 161.2;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 125.01;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 156.99;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 129.66;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 141.89;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 71.3;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 71.3;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation += occupRows[i + 2] * 65.48;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 65.48;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 129.66;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 136.43;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation += occupRows[i + 2] * 253.65;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation += occupRows[i + 2] * 161.04;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 156.37;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 136.43;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 92.75;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 137.86;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 108.71;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 120.96;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 136.43;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 63.48;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 63.48;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 47.31;
          }
        } else if(occupRows[i + 1] == "VB") {
          if(occupRows[i] == "A-1 Assembly, theaters, with stage") {
            valuation += occupRows[i + 2] * 171.48;
          } else if(occupRows[i] == "A-1 Assembly, theaters, without stage") {
            valuation += occupRows[i + 2] * 152.48;
          } else if(occupRows[i] == "A-2 Assembly, nightclubs") {
            valuation += occupRows[i + 2] * 134.26;
          } else if(occupRows[i] == "A-2 Assembly, restaurants, bars, banquet halls") {
            valuation += occupRows[i + 2] * 133.26;
          } else if(occupRows[i] == "A-3 Assembly, churches") {
            valuation += occupRows[i + 2] * 154.68;
          } else if(occupRows[i] == "A-3 Assembly, general, community halls, libraries, museums") {
            valuation += occupRows[i + 2] * 119.5;
          } else if(occupRows[i] == "A-4 Assembly, arenas") {
            valuation += occupRows[i + 2] * 151.48;
          } else if(occupRows[i] == "B Business") {
            valuation += occupRows[i + 2] * 123.97;
          } else if(occupRows[i] == "E Educational") {
            valuation += occupRows[i + 2] * 137.57;
          } else if(occupRows[i] == "F-1 Factory and industrial, moderate hazard") {
            valuation += occupRows[i + 2] * 66.75;
          } else if(occupRows[i] == "F-2 Factory and industrial, low hazard") {
            valuation += occupRows[i + 2] * 65.75;
          } else if(occupRows[i] == "H-1 High Hazard, explosives") {
            valuation = 0;
          } else if(occupRows[i] == "H234 High Hazard") {
            valuation += occupRows[i + 2] * 59.94;
          } else if(occupRows[i] == "H-5 HPM") {
            valuation += occupRows[i + 2] * 123.97;
          } else if(occupRows[i] == "I-1 Institutional, supervised environment") {
            valuation += occupRows[i + 2] * 132.19;
          } else if(occupRows[i] == "I-2 Institutional, hospitals") {
            valuation = 0;
          } else if(occupRows[i] == "I-2 Institutional, nursing homes") {
            valuation = 0;
          } else if(occupRows[i] == "I-3 Institutional, restrained") {
            valuation += occupRows[i + 2] * 148.68;
          } else if(occupRows[i] == "I-4 Institutional, day care facilities") {
            valuation += occupRows[i + 2] * 132.19;
          } else if(occupRows[i] == "M Mercantile") {
            valuation += occupRows[i + 2] * 89.05;
          } else if(occupRows[i] == "R-1 Residential, hotels") {
            valuation += occupRows[i + 2] * 133.61;
          } else if(occupRows[i] == "R-2 Residential, multiple family") {
            valuation += occupRows[i + 2] * 104.47;
          } else if(occupRows[i] == "R-3 Residential, one- and two-family") {
            valuation += occupRows[i + 2] * 113.85;
          } else if(occupRows[i] == "R-4 Residential, care/assisted living facilities") {
            valuation += occupRows[i + 2] * 132.19;
          } else if(occupRows[i] == "S-1 Storage, moderate hazard") {
            valuation += occupRows[i + 2] * 58.94;
          } else if(occupRows[i] == "S-2 Storage, low hazard") {
            valuation += occupRows[i + 2] * 57.94;
          } else if(occupRows[i] == "U Utility, miscellaneous") {
            valuation += occupRows[i + 2] * 45.09;
          }
        }
      }
      if($('#basementArea').val()) {
        valuation += $('#basementArea').val() * 15;
      }
      if($('#garageArea').val()) {
        valuation += $('#garageArea').val() * 45.09;
      }
      if($('#otherArea').val()) {
        valuation += $('#otherArea').val() * 113.85;
      }
      if($('#carportArea').val()) {
        valuation += $('#carportArea').val() * 33.82;
      }
      if($('#deckArea').val()) {
        valuation += $('#deckArea').val() * 30.21;
      }
      if($('#premanArea').val()) {
        valuation += parseInt($('#premanArea').val()) * 56.93;
      }
      if($('#remodelCost').val()) {
        valuation += parseInt($('#remodelCost').val());
      }
      if($('#livingSpaceArea').val() >= 2000) {
        valuation += $('#livingSpaceArea').val() * 142.31;
      } else if($('#livingSpaceArea').val() < 2000 && $('#livingSpaceArea').val() > 0) {
        valuation += $('#livingSpaceArea').val() * 113.85;
      }
      if(valuation <= 500) {
        permitFee = 39.90;
      } else if(valuation > 500 && valuation <= 2000) {
        permitFee = (39.90 + (Math.ceil((valuation - 500) / 100) * 4.99));
      } else if(valuation > 2000 && valuation <= 25000) {
        permitFee = (114.75 + (Math.ceil((valuation - 2000) / 1000) * 23));
      } else if(valuation > 25000 && valuation <= 50000) {
        permitFee = (643.75 + (Math.ceil((valuation - 25000) / 1000) * 16.76));
      } else if(valuation > 50000 && valuation <= 100000) {
        permitFee = (1062.75 + (Math.ceil((valuation - 50000) / 1000) * 11.51));
      } else if(valuation > 100000 && valuation <= 500000) {
        permitFee = (1638.25 + (Math.ceil((valuation - 100000) / 1000) * 9.24));
      } else if(valuation > 500000 && valuation <= 1000000) {
        permitFee = (5334.25 + (Math.ceil((valuation - 500000) / 1000) * 7.78));
      } else if(valuation > 1000000) {
        permitFee = (9224.25 + (Math.ceil((valuation - 1000000) / 1000) * 5.98));
      }
      if(projectType == "RN") {
        if($('#structureType').val() == "a single family home") {
          planRevFee = 292.58;
        } else if($('#structureType').val() == "a duplex") {
          planRevFee = 372.37;
        } else {
          planRevFee = (permitFee * .22);
        }
      } else if(projectType == "RA" || projectType == "RR" || projectType == "RB") {
        planRevFee = (permitFee * .22);
      } else if(projectType == "CN" || projectType == "CA" || projectType == "CR" || projectType == "CB") {
        planRevFee = (permitFee * .65);
      }
      if(planRevFee < 41.22) {
        planRevFee = 41.22;
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
      $('#bldPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#bldPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#bldPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#bldPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#bldPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#bldPermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "plm") {
      permitFee = 45.82;
      if($('.fixtureQuantity').val() > 0) {
        permitFee += 32.73 + (($('.fixtureQuantity').val() - 1) * 12.63);
      }
      esaFee = 0;
      smifFee = 0;
      stateFee = 0;
      planRevFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#plmPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#plmPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#plmPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#plmPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#plmPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#plmPermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "sewer") {
      permitFee = 87.71;
      if($('#pgsewer .connectionType').val() == "replacing" || $('#pgsewer .connectionType').val() == "repairing") {
        permitFee += 288.01;
      } else if($('#pgsewer .connectionType').val() == "adding") {
        permitFee += 327.28;
      }
      esaFee = permitFee * .07;
      if($('#pgsewer .rowRestoration').val() == "will") {
        permitFee += 78.55;
        if($('#pgsewer .daysForBarricade').val() > 0 && $('#pgsewer .daysForBarricade').val() <= 5) {
          permitFee += parseInt($('#pgsewer .daysForBarricade').val()) * 53.19;
        } else {
          permitFee += 265.97;
        }
      }
      smifFee = 0;
      stateFee = 0;
      planRevFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#sewerPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#sewerPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#sewerPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#sewerPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#sewerPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#sewerPermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "wtr") {
      permitFee = 0;
      if($('#pgwtr .connectionType').val() == "replacing" || $('#pgwtr .connectionType').val() == "repairing") {
        permitFee = 78.55;
      } else if($('#pgwtr .connectionType').val() == "adding") {
        permitFee = 157.09;
      }
      esaFee = permitFee * .07;
      if($('#pgwtr .barricadeIf').val() == "will") {
        if($('#pgwtr .daysForBarricade').val() > 0 && $('#pgwtr .daysForBarricade').val() <= 5) {
          permitFee += parseInt($('#pgwtr .daysForBarricade').val()) * 53.19;
        } else {
          permitFee += 265.97;
        }
      }
      smifFee = 0;
      stateFee = 0;
      planRevFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#wtrPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#wtrPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#wtrPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#wtrPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#wtrPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#wtrPermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "storm") {
      permitFee = 392.74;
      esaFee = permitFee * .07;
      if($('#pgstorm .rowRestoration').val() == "will") {
        permitFee += 78.55;
        if($('#pgstorm .dischargePoint').val() == "a sidewalk drain") {
          permitFee += 78.55;
        }
        if($('#pgstorm .daysForBarricade').val() > 0 && $('#pgstorm .daysForBarricade').val() <= 5) {
          permitFee += parseInt($('#pgstorm .daysForBarricade').val()) * 53.19;
        } else {
          permitFee += 265.97;
        }
      }
      smifFee = 0;
      stateFee = 0;
      planRevFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#stormPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#stormPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#stormPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#stormPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#stormPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#stormPermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "sitedev") {
      var cutAndFill = $('#cutArea').val() + $('#fillArea').val();
      if(cutAndFill > 0 && cutAndFill <= 100) {
        permitFee = 199.48;
        planRevFee = 85.12;
      } else if(cutAndFill > 100 && cutAndFill <= 1000) {
        permitFee = 199.48 + (35.9 * Math.ceil((cutAndFill - 100) / 100));
        planRevFee = 106.38;
      } else if(cutAndFill > 1000 && cutAndFill <= 10000) {
        permitFee = 522.55 + (38.57 * Math.ceil((cutAndFill - 1000) / 1000));
        planRevFee = 132.98
      } else if(cutAndFill > 10000 && cutAndFill <= 100000) {
        permitFee = 869.65 + (175.55 * Math.ceil((cutAndFill - 10000) / 10000));
        planRevFee = 132.98 + (65.17 * Math.ceil((cutAndFill - 10000) / 10000));
      } else if(cutAndFill > 100000 && cutAndFill <= 200000) {
        permitFee = 2449.63 + (97.08 * Math.ceil((cutAndFill - 100000) / 100000));
        planRevFee = 719.76 + (35.24 * Math.ceil((cutAndFill - 100000) / 10000));
      } else if(cutAndFill > 200000) {
        permitFee = 2449.63 + (97.08 * Math.ceil((cutAndFill - 100000) / 100000));
        planRevFee = 1071.91 + (19.27 * Math.ceil((cutAndFill - 200000) / 10000));
      }
      if($('#pavedArea').val() > 0 && $('#pavedArea').val() <= 3000) {
        permitFee += 235.64;
      } else if($('#pavedArea').val() > 3000) {
        permitFee += 235.64 + (39.27 * Math.ceil(($('#pavedArea').val() - 3000) / 3000));
      }
      acres = Math.ceil($('#clearingArea').val() / 43560);
      if(acres == 1) {
        permitFee += 130.91;
      } else if(acres == 2) {
        permitFee += 196.37;
      } else if(acres > 2 && acres <= 5) {
        permitFee += 261.82;
      } else if(acres > 5 && acres <= 10) {
        permitFee += 261.82 + ((acres - 5) * 32.73);
      } else if(acres > 10) {
        permitFee += 425.46 + ((acres - 10) * 26.18);
      }
      esaFee = (permitFee + planRevFee) * .07;
      smifFee = 0;
      stateFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#sitedevPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#sitedevPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#sitedevPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#sitedevPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#sitedevPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#sitedevPermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "sign") {
      valuation = $('#signCost').val();
      if(valuation <= 500) {
        permitFee = 39.90;
      } else if(valuation > 500 && valuation <= 2000) {
        permitFee = (39.90 + (Math.ceil((valuation - 500) / 100) * 4.99));
      } else if(valuation > 2000 && valuation <= 25000) {
        permitFee = (114.75 + (Math.ceil((valuation - 2000) / 1000) * 23));
      } else if(valuation > 25000 && valuation <= 50000) {
        permitFee = (643.75 + (Math.ceil((valuation - 25000) / 1000) * 16.76));
      } else if(valuation > 50000 && valuation <= 100000) {
        permitFee = (1062.75 + (Math.ceil((valuation - 50000) / 1000) * 11.51));
      } else if(valuation > 100000 && valuation <= 500000) {
        permitFee = (1638.25 + (Math.ceil((valuation - 100000) / 1000) * 9.24));
      } else if(valuation > 500000 && valuation <= 1000000) {
        permitFee = (5334.25 + (Math.ceil((valuation - 500000) / 1000) * 7.78));
      } else if(valuation > 1000000) {
        permitFee = (9224.25 + (Math.ceil((valuation - 1000000) / 1000) * 5.98));
      }
      planRevFee = (permitFee * .65);
      if(planRevFee < 41.22) {
        planRevFee = 41.22;
      }
      esaFee = (permitFee + planRevFee) * .07;
      smifFee = permitFee * .1;
      stateFee = 4.5;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#signPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#signPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#signPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#signPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#signPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#signPermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "demo") {
      if($('#demoType').val() == "residential") {
        if($('#demoArea').val() <= 2500) {
          permitFee = 99.74;
        } else if($('#demoArea').val() > 2500 && $('#demoArea').val() <= 20000) {
          permitFee = 139.63;
        } else if($('#demoArea').val() > 20000) {
          permitFee = 226.07;
        }
      } else if($('#demoType').val() == "commercial") {
        if($('#demoArea').val() <= 20000) {
          permitFee = 139.63;
        } else if($('#demoArea').val() > 20000) {
          permitFee = 226.07;
        }
      }
      planRevFee = permitFee * .22;
      if(planRevFee < 41.22) {
        planRevFee = 41.22;
      }
      esaFee = permitFee * .07;
      smifFee = permitFee * .1;
      stateFee = 4.5;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#demoPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#demoPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#demoPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#demoPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#demoPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#demoPermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "land") {
      for(var i = 0; i < useRows.length; i += 2) {
        if(useRows[i] == "accessory dwelling unit") {
          permitFee += 824.52;
        } else if(useRows[i] == "conditional use") {
          if(useRows[i + 1] == "duplex, triplex, townhome in R-2SRD and HMR-SRD districts" || useRows[i + 1] == "duplex, triplex, townhome in NRX district" || useRows[i + 1] == "general" || useRows[i + 1] == "historic structure re-use" || useRows[i + 1] == "special needs housing" || useRows[i + 1] == "use in south Tacoma M/IC overlay district" || useRows[i + 1] == "large scale retail") {
            permitFee += 4920.52;
          } else if(useRows[i + 1] == "day care centers, 13-49 children") {
            permitFee += 824.52;
          }
        } else if(useRows[i] == "critical areas") {
          if(useRows[i + 1] == "activities allowed with staff review") {
            permitFee += 865.75;
          } else if(useRows[i + 1] == "development permit") {
            permitFee += 8441.04;
          } else if(useRows[i + 1] == "minor development permit") {
            permitFee += 3221.08;
          } else if(useRows[i + 1] == "verification") {
            permitFee += 1693.30;
          }
        } else if(useRows[i] == "environmental review") {
          if(useRows[i + 1] == "addendum EIS") {
            permitFee += 824.52;
          } else if(useRows[i + 1] == "environmental impact statement") {
            permitFee += 2460.26;
          } else if(useRows[i + 1] == "supplemental EIS") {
            permitFee += 1662.34;
          } else if(useRows[i + 1] == "buildings over 20,000 square feet") {
            permitFee += 2460.26;
          } else if(useRows[i + 1] == "grading permits > 500 cy and residential buildings > 20 units and 6,000 - 10,000 square feet") {
            permitFee += 1163.64;
          } else if(useRows[i + 1] == "parking lots > 40 stalls, signs, residential buildings of > 20 units and < 6000 square feet and misc actions") {
            permitFee += 664.93;
          } else if(useRows[i + 1] == "residential buildings > 20 units and 10,001 - 20,000 square feet or commerical building 12,000 - 20,000 square feet") {
            permitFee += 1662.34;
          } else if(useRows[i + 1] == "SEPA with a discretionary land use permit") {
            permitFee += 492.05;
          }
        } else if(useRows[i] == "information request") {
          if(useRows[i + 1] == "determination or interpretation by director") {
            permitFee += 904.32;
          } else if(useRows[i + 1] == "uses not specifically classified") {
            permitFee += 865.75;
          } else if(useRows[i + 1] == "zoning verification letter") {
            permitFee += 166.23;
          }
        } else if(useRows[i] == "major modification of permit") {
          if(useRows[i + 1] == "all others") {
            permitFee += 2460.26;
          } else if(useRows[i + 1] == "conditional use permit") {
            permitFee += 2460.26;
          } else if(useRows[i + 1] == "single-family residential") {
            permitFee += 492.05;
          }
        } else if(useRows[i] == "plats / short plats / boundary line adjustments") {
          if(useRows[i + 1] == "binding site plan approval" || useRows[i + 1] == "final short or long plat") {
            permitFee += 1642.39;
          } else if(useRows[i + 1] == "boundary line adjustment") {
            permitFee += 984.11;
          } else if(useRows[i + 1] == "preliminary plat") {
            if(lots == 2) {
              permitFee += 1316.57;
            } else if(lots == 3) {
              permitFee += 1964.21;
            } else if(lots == 4) {
              permitFee += 2626.49;
            } else if(lots > 4 && lots < 10) {
              permitFee += 4122.60;
            } else if(lots >= 10) {
              permitFee += 4255.58 + ((lots - 10) * 123.02);
            }
          }
        } else if(useRows[i] == "shoreline") {
          if(useRows[i + 1] == "single-family residential") {
            permitFee += 824.52;
          } else if(useRows[i + 1] == "exemption") {
            permitFee += 166.23;
          } else if(useRows[i + 1] == "other than single-family") {
            if(shoreval <= 500000) {
              permitFee += 6582.85;
            } else if(shoreval > 500000 && shoreval <= 1000000) {
              permitFee += 8245.19;
            } else if(shoreval > 1000000 && shoreval <= 1500000) {
              permitFee += 9841.04;
            } else if(shoreval > 1500000 && shoreval <= 2000000) {
              permitFee += 11503.37;
            } else if(shoreval > 2000000) {
              permitFee += 11503.37 + (Math.ceil((shoreval - 2000000) / 1000000) * 1662.34);
            }
          } else if(useRows[i + 1] == "revisions - single-family") {
            permitFee += 492.05;
          } else if(useRows[i + 1] == "revisions - other than single-family") {
            permitFee += 2460.26;
          }
        } else if(useRows[i] == "site rezone") {
          if(useRows[i + 1] == "all other districts") {
            permitFee += 9841.04;
          } else if(useRows[i + 1] == "single-family family dwelling district (R-1, R-2, R2SRD)") {
            permitFee += 2460.26;
          } else if(useRows[i + 1] == "two-family dwelling district") {
            permitFee += 3324.67;
          }
        } else if(useRows[i] == "variance") {
          if(useRows[i + 1] == "accessory building height") {
            permitFee += 824.52;
          } else if(useRows[i + 1] == "design" || useRows[i + 1] == "development regulations (other than single-family residential)" || useRows[i + 1] == "minor variance (other than single-family residential)" || useRows[i + 1] == "parking" || useRows[i + 1] == "signs") {
            permitFee += 2460.26;
          } else if(useRows[i + 1] == "development regulations (single-family residential)" || useRows[i + 1] == "minor variance (single-family residential)") {
            permitFee += 824.52;
          } else if(useRows[i + 1] == "view-sensitive overlay district main building height") {
            permitFee += 1662.34;
          }
        } else if(useRows[i] == "extension of permit") {
          permitFee += 412.26;
        } else if(useRows[i] == "site approval") {
          permitFee += 9841.04;
        } else if(useRows[i] == "temporary homeless camp") {
          permitFee += 1963.68;
        }
      }
      smifFee = 0;
      stateFee = 0;
      planRevFee = 0;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#landPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#landPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#landPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#landPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#landPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#landPermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "fire") {
      if($('#fireCategories').val() == "fire alarms") {
        if($('#pgfire .q2 input').val() > 0 && $('#pgfire .q2 input').val() <= 50) {
          permitFee = 226.8;
        } else if($('#pgfire .q2 input').val() > 50 && $('#pgfire .q2 input').val() <= 100) {
          permitFee = 453.6;
        } else if($('#pgfire .q2 input').val() > 100 && $('#pgfire .q2 input').val() <= 200) {
          permitFee = 680.4;
        } else if($('#pgfire .q2 input').val() > 200 && $('#pgfire .q2 input').val() <= 300) {
          permitFee = 907.2;
        } else if($('#pgfire .q2 input').val() > 300 && $('#pgfire .q2 input').val() <= 400) {
          permitFee = 1134;
        } else if($('#pgfire .q2 input').val() > 400 && $('#pgfire .q2 input').val() <= 600) {
          permitFee = 1360.8;
        } else if($('#pgfire .q2 input').val() > 600) {
          permitFee = 1360.8 + (($('#pgfire .q2 input').val() - 600) * 2.27);
        }
      } else if($('#fireCategories').val() == "pre-engineered systems") {
        if($('#firePreEngSys').val() > 0) {
          permitFee = 793.8 * $('#firePreEngSys').val();
        }
        if($('#firePreEngNoz').val() > 50) {
          permitFee += ($('#firePreEngNoz').val() - 50) * 2.27;
        }
      } else if($('#fireCategories').val() == "kitchen hood suppression systems") {
        permitFee = $('#pgfire .q2 input').val() * 340.2;
        esaFee = (permitFee * .95) * .07;
        smifFee = (permitFee * .95) * .1;
        stateFee = 4.5;
      } else if($('#fireCategories').val() == "private fire service mains and their appurtenances") {
        permitFee = $('#pgfire .q2 input').val() * 277.5;
        esaFee = (permitFee * .95) * .07;
        smifFee = (permitFee * .95) * .1;
        stateFee = 4.5;
      } else if($('#fireCategories').val() == "fire sprinkler tennant improvement") {
        if($('#fireSprinklerRisers').val() > 0 && $('#fireSprinklerRisers').val() <= 6) {
          permitFee = 226.8;
        } else if($('#fireSprinklerRisers').val() > 6) {
          permitFee = 453.6;
        }
        if($('#fireSprinklerHeads').val() > 0 && $('#fireSprinklerHeads').val() <= 6) {
          permitFee += 226.8;
        } else if($('#fireSprinklerHeads').val() > 6) {
          permitFee += 453.6;
        }
        esaFee = (permitFee * .95) * .07;
        smifFee = (permitFee * .95) * .1;
        stateFee = 4.5;
      } else if($('#fireCategories').val() == "new water based fire suppression systems") {
        if($('#fireSuppressionRisers').val() > 0 && $('#fireSuppressionRisers').val() <= 2) {
          permitFee = 703.08;
        } else if($('#fireSuppressionRisers').val() > 2) {
          permitFee = 703.08 + (($('#fireSuppressionRisers').val() - 2) * 34.02);
        }
        if($('#fireSuppressionHeads').val() > 0 && $('#fireSuppressionHeads').val() <= 20) {
          permitFee += 703.08;
        } else if($('#fireSuppressionHeads').val() > 20) {
          permitFee += 703.08 + (($('#fireSuppressionHeads').val() - 20) * 3.4);
        }
        permitFee += $('#fireSuppressionStandpipes').val() * 340.2;
        permitFee += $('#fireSuppressionPumps').val() * 567;
        esaFee = (permitFee * .95) * .07;
        smifFee = (permitFee * .95) * .1;
        stateFee = 4.5;
      } else if($('#fireCategories').val() == "smoke control systems") {
        permitFee = 226.8;
        planRevFee = 226.8;
      }
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#firePermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#firePermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#firePermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#firePermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#firePermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#firePermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "event") {
      if (parseInt($('#eventAttendance').val()) >= 50 && parseInt($('#eventAttendance').val()) <= 250) {
        permitFee = 25;
      } else if (parseInt($('#eventAttendance').val()) > 250 && parseInt($('#eventAttendance').val()) <= 1000) {
        permitFee = 50;
      } else if (parseInt($('#eventAttendance').val()) > 1000 && parseInt($('#eventAttendance').val()) <= 10000) {
        permitFee = 100;
      } else if (parseInt($('#eventAttendance').val()) > 10000 && parseInt($('#eventAttendance').val()) <= 50000) {
        permitFee = 250;
      } else if (parseInt($('#eventAttendance').val()) > 50000) {
        permitFee = 500;
      }
      if ($('#eventOrgType').val() == "commercial") {
        permitFee = permitFee * 2;
      }
      var discountDate = new Date();
      discountDate.setDate(discountDate.getDate() + 60);
      if (new Date($('#eventDate').val()) > discountDate) {
        permitFee = permitFee * .9;
      }
      esaFee = (permitFee * .95) * .07;
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#eventPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#eventPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#eventPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#eventPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#eventPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#eventPermitFeeDetails .total').html(makeMoney(total));
    } else if(permits[i] == "row") {
      if ($('#rowType').val() == "construction on") {
        if ($('#rconSidewalk').is(':checked')) {
          if ($('#rowSidewalkWork').val() == "adding a new") {
            permitFee = 1499.49;
          } else {
            permitFee = 392.74;
          }
          if (($('#rowSidewalkSize').val() / 9) > 30) {
            permitFee += 2.62 * (($('#rowSidewalkSize').val() / 9) - 30);
          }
        }
        if ($('#rconDriveway').is(':checked')) {
          permitFee += $('#rowAsphaltDrivewayNum').val() * 235.64;
          permitFee += $('#rowConcreteDrivewayNum').val() * 366.55;
        }
        if ($('#rconCurb').is(':checked')) {
          if ($('#rowGutterLength').val() > 50) {
            permitFee += 2.62 * ($('#rowGutterLength').val() - 50);
          }
        }
        if ($('#rconTrenchBore').is(':checked')) {
          if ($('#rowTrenchType').val() == "an open cut trench") {
            if ($('#rowTrenchLength').val() > 100) {
              permitFee += 248.73 + (parseInt($('#rowTrenchLength').val() - 100) * .92);
            } else {
              permitFee += 248.73;
            }
          } else if ($('#rowTrenchType').val() == "a monitoring well, a bore, or potholing") {
            permitFee += $('#rowBoreCount').val() * 78.55;
          }
        }
        if ($('#rowPaving').val() > 3000) {
          permitFee += 235.64 + (Math.round(($('#rowPaving').val() - 3000) / 1000) * 39.27);
        } else {
          permitFee += 235.64;
        }
      } else if ($('#rowType').val() == "use of") {
        if ($('#rowUse').val() == "a special motor vehicle") {
          if ($('#rowSMVType').val() == "an annual" || $('#rowSMVType').val() == "a single trip") {
            permitFee = 39.90;
          } else if ($('#rowSMVType').val() == "a house move") {
            permitFee = 418.91;
          } else if ($('#rowSMVType').val() == "a heavy haul corridor") {
            permitFee = 3000;
          }
        } else if ($('#rowUse').val() == "overtime parking") {
          if ($('#rowUseDays').val() == 1) {
            permitFee = 33.25;
          } else if ($('#rowUseDays').val() > 1 && $('#rowUseDays').val() <= 7) {
            permitFee = 66.49;
          } else if ($('#rowUseDays').val() > 7 && $('#rowUseDays').val() <= 14) {
            permitFee = 99.74;
          } else if ($('#rowUseDays').val() > 14 && $('#rowUseDays').val() <= 21) {
            permitFee = 132.95;
          } else if ($('#rowUseDays').val() > 21 && $('#rowUseDays').val() <= 31) {
            permitFee = 199.48;
          } else if ($('#rowUseDays').val() > 31) {
            permitFee = 199.48 + (($('#rowUseDays').val() - 31) * 13.30);
          }
        } else if ($('#rowUse').val() == "a banner") {
          if ($('#rowBannerInstall').val() == "city") {
            permitFee += 478.76 + ($('#rowBannerBlocks').val() * 33.25);
          } else if ($('#rowBannerInstall').val() == "private") {
            permitFee += $('#rowBannerBlocks').val() * 79.79;
          }
          if ($('#rowHoliday').is(':checked')) {
            permitFee += 52.04;
          }
        }
      } else if ($('#rowType').val() == "utility work in") {
        if ($('#rowTrench').val() == "will") {
          permitFee += 248.73 + (($('#rowTrenchLength').val() - 100) * .92);
        }
        if ($('#rowBores').val() == "will") {
          permitFee += $('#rowBoreCount').val() * 78.55;
        }
      }
      esaFee = (permitFee * .95) * .07;
      if($('#pgrow .daysForBarricade').val() > 0 && $('#pgrow .daysForBarricade').val() <= 5) {
        permitFee += parseInt($('#pgrow .daysForBarricade').val()) * 53.19;
      } else if ($('#pgrow .daysForBarricade').val() > 5) {
        permitFee += 265.97;
      }
      total = permitFee + esaFee + smifFee + stateFee + planRevFee;
      grandTotal += total;
      $('#rowPermitFeeDetails .base .money').html(makeMoney(permitFee));
      $('#rowPermitFeeDetails .esa .money').html(makeMoney(esaFee));
      $('#rowPermitFeeDetails .smif .money').html(makeMoney(smifFee));
      $('#rowPermitFeeDetails .state .money').html(makeMoney(stateFee));
      $('#rowPermitFeeDetails .review .money').html(makeMoney(planRevFee));
      $('#rowPermitFeeDetails .total').html(makeMoney(total));
    }
  }
  $('#grandTotal').html(makeMoney(grandTotal));
}
function backPermit(thisperm) {
  if(permits.length == 1 || thisperm == permits[0]) {
    $('#details-num').text("");
    $('#pgfirst-pointer').removeClass('post');
    $('.description').addClass('open').removeClass('disclaimer').html(pg1and2instructions);
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
  if(thisperm == "bld") {
    bldPermit();
  } else if(thisperm == "wtr") {
    wtrPermit();
  } else if(thisperm == "plm") {
    plmPermit();
  } else if(thisperm == "storm") {
    stormPermit();
  } else if(thisperm == "sewer") {
    sewerPermit();
  } else if(thisperm == "sitedev") {
    sitedevPermit();
  } else if(thisperm == "sign") {
    signPermit();
  } else if(thisperm == "demo") {
    demoPermit();
  } else if(thisperm == "land") {
    landPermit();
  } else if(thisperm == "fire") {
    firePermit();
  } else if(thisperm == "event") {
    eventPermit();
  } else if(thisperm == "row") {
    rowPermit();
  }
}
function makeMoney(num) {
  var halves = num.toString().split('.');
  var leftHalf, rightHalf;
  if(halves[1]) {
    rightHalf = halves[1].split('');
    leftHalf = halves[0];
    if(rightHalf.length == 1) {
      rightHalf += "0";
    } else if(rightHalf.length == 2) {
      rightHalf = rightHalf.join('');
    } else if(rightHalf.length > 2) {
      rightHalf.splice(2, 0, '.');
      rightHalf = rightHalf.join('');
      rightHalf = Math.round(rightHalf);
      if (rightHalf > 99) {
        rightHalf -= 100;
        leftHalf = parseInt(leftHalf) + 1;
      }
      if (rightHalf == 0) {
        rightHalf = "00";
      } else if (rightHalf < 10) {
        rightHalf = "0" + rightHalf;
      }
      leftHalf = leftHalf.toString().split('');
      for(var i = leftHalf.length - 3; i > 0; i -= 3) {
        leftHalf.splice(i, 0, ',');
      }
      leftHalf = leftHalf.join('');
    }
  } else {
    leftHalf = halves[0].split('');
    for(var i = leftHalf.length - 3; i > 0; i -= 3) {
      leftHalf.splice(i, 0, ',');
    }
    leftHalf = leftHalf.join('');
    rightHalf = "00";
  }
  return "$" + leftHalf + "." + rightHalf;
}
