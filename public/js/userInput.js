// Our total purchase price. This number is entered by the user.
var purchasePrice = 0;
// Our monthly rent. This number is entered by the user.
var monthlyRent = 0;
// Yearly Rent. This number is just monthlyRent x 12.
var yearlyRent = 0;
// Yearly Taxes. This number is entered by the user.
var yearlyTaxes = 0;
// Yearly maintenance. This number is entered by the user.
var yearlyMaintenance = 0;
// Yearly Cost. Let's see if we end up using this. This is the total of
var yearOneCost = 0;
// Renovation Costs at purchase. This is any upfront money necessary to get the property to the projected rental rate.
var renovationCosts = 0;
// monthly Utility. Not all projections will include costs for utilities, because tenants will often pay them.
var monthlyUtilities = 0;
// yearly Utilities. Just monthly x 12.
var yearlyUtilities = 0;
// Vacancy Rate. This is basically the percentage of the time the place is vacant. We need this as a percentage, which will be multiplied to the yearly income.
var vacancyRate = 0;
// Net Rent. This number represents the total rent minus all of the costs associated with the property.
var netRent = 0;
// Year One Cost = all of the up front costs (but none that are repeated yearly)
var yearOneCost = 0;
// Yield. This is our final number, in the form of a percentage. When we build the real version, make sure the user can only input a percentage.
var yearOneYield = 0;
// I want to convert this number to a two decimal percentage.
var yieldToFixed = 0;
// We also need to get the user address!
var address = "";
// The results array that we push the button results to.
var resultsArray = [];

$(document).ready(function() {
  //   Initial variables

  $("#submit").on("click", function(event) {
    event.preventDefault();

    address = $("#street-address")
      .val()
      .trim();
    console.log("Address: " + address);

    cityStateOrZip = $("#city-state-or-zip")
      .val()
      .trim();
    console.log("City State or Zip: " + cityStateOrZip);

    purchasePrice = $("#purchasePrice")
      .val()
      .trim();
    console.log(purchasePrice);
    monthlyRent = $("#monthlyRent")
      .val()
      .trim();
    console.log("monthly rent: " + monthlyRent);

    yearlyRent = monthlyRent * 12;
    console.log("yearly rent: " + yearlyRent);

    vacancyRate = document.getElementById("vacancyRate").value / 100;

    console.log("vacancy rate: " + vacancyRate);

    yearOneRent = yearlyRent - vacancyRate * yearlyRent;
    console.log("yearOneRent: " + yearOneRent);

    yearlyTaxes = $("#yearlyTaxes")
      .val()
      .trim();
    console.log("yearly taxes: " + yearlyTaxes);

    yearlyInsurance = $("#yearlyInsurance")
      .val()
      .trim();
    console.log("yearly taxes: " + yearlyInsurance);

    yearlyMaintenance = $("#yearlyMaintenance")
      .val()
      .trim();
    console.log("yearly maintenance cost: " + yearlyMaintenance);

    monthlyUtilities = $("#monthlyUtilities")
      .val()
      .trim();
    console.log("monthly utilities: " + monthlyUtilities);

    yearlyUtilities = monthlyUtilities * 12;
    console.log("yearly Utilities: " + yearlyUtilities);

    closingCosts = $("#closingCosts")
      .val()
      .trim();
    console.log("closing costs: " + closingCosts);

    renovationCosts = $("#renovationCosts")
      .val()
      .trim();
    console.log("renovation Costs: " + renovationCosts);

    netRent =
      yearOneRent -
      yearlyTaxes -
      yearlyMaintenance -
      yearlyUtilities -
      yearlyInsurance;
    console.log("Net Rent: " + netRent);

    netRentToFixed = netRent.toFixed(2);
    console.log("Net Rent to Fixed: " + netRentToFixed);

    yearOneCost =
      parseInt(purchasePrice) +
      parseInt(closingCosts) +
      parseInt(renovationCosts);
    console.log("total year one costs: " + yearOneCost);

    yearOneYield = (netRentToFixed / yearOneCost) * 100;
    console.log("total yield = " + yearOneYield);

    // Want to convert the number to only include two decimals.
    yieldToFixed = yearOneYield.toFixed(2);

    var resultsTable = $("<table class='table'>");
    var resultsHead = $("<thead>");
    var resultsTR = $("<tr>");
    var resultsTH = $("<th scope='col'>Address</th>");
    var resultsTH2 = $("<th scope='col'>Initial Investment</th>");
    var resultsTH3 = $("<th scope='col'>Year One Return</th>");
    var resultsTH4 = $("<th scope='col'>Yield</th>");

    resultsTR.append(resultsTH, resultsTH2, resultsTH3, resultsTH4);
    resultsHead.append(resultsTR);
    resultsTable.append(resultsHead);

    var tBody = $("<tbody>");
    var tRow = $("<tr>");
    var td = $("<td>" + address + "</td>");
    var td2 = $("<td>" + "$" + yearOneCost + "</td>");
    var td3 = $("<td>" + "$" + netRentToFixed + "</td>");
    var td4 = $("<td>" + yieldToFixed + "%" + "</td>");

    tRow.append(td, td2, td3, td4);
    tBody.append(tRow);
    resultsTable.append(tBody);

    var buttonRow = $("<tr>");
    var button = $(
      "<button type='button' class='btn btn-primary saveSearch' data-id='" +
        resultsArray.length +
        "'> Save Search </button>"
    );

    resultsArray.push([address, yearOneCost, netRentToFixed, yieldToFixed]);

    console.log(resultsArray);

    buttonRow.append(button);
    resultsTable.append(buttonRow);

    $(".results").append(resultsTable);
  });
});