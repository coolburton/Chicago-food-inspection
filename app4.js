d3.csv("./new_restaurants_pd.csv").then(function(tableData) {
  console.log(tableData)

  //Create Dropdown Arrays
  bizzNameList = []
  addressList = []
  tableData.forEach(function(inspection) {
    bizzNameList.push(inspection.AKA_name)
    addressList.push(inspection.Address)
  });


  //Fill in Business Name dropdown
  var biznameselect = document.getElementById("inputBizz");
  var biznameoptions = bizzNameList
  for(var i = 0; i < biznameoptions.length; i++) {
    var opt = biznameoptions[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    biznameselect.appendChild(el);
  };


  //Filter address list upon business selection
  d3.select('#inputBizz').on('change', function() {
    var newbizzElement = d3.select("#inputBizz");
    var newbizzValue = newbizzElement.property("value");
    var grabaddresslist = document.getElementById("inputAddress");
    (grabaddresslist.innerHTML = "")
    
      newaddresslist = []
      tableData.forEach(function(filter){
      filterbizzname = filter.AKA_name
      filterbizzaddress = filter.Address
      if (newbizzValue === filterbizzname) {
        newaddresslist.push(filterbizzaddress)
        }
      });
      truenewaddresslist = ["Choose...", ]
      $.each(newaddresslist, function(i, el){
        if($.inArray(el, truenewaddresslist) === -1) truenewaddresslist.push(el);
      });
      var filteredaddresslistoptions = truenewaddresslist
      for(var i = 0; i < filteredaddresslistoptions.length; i++) {
        var opt = filteredaddresslistoptions[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        grabaddresslist.appendChild(el);
      }
  });


  //Function for starting Javascript after submission
  function handleSubmit() {
    d3.event.preventDefault();
    inputBizzsubmit = String(d3.select("#inputBizz").node().value);
    runValue();
    console.log(inputBizzsubmit);
    };


  //Populate table based on dropdown submissions
  function runValue() {
    var table = d3.select("#completeDataTable");
    var tbody = table.select("tbody");
    tbody.html("")
    d3.event.preventDefault();
    var bizzElement = d3.select("#inputBizz");
    var addressElement = d3.select("#inputAddress")
    var bizzValue = bizzElement.property("value");
    var addressValue = addressElement.property("value");
    console.log(bizzValue)
    console.log(addressValue)

    bv = bizzValue
    av = addressValue
    tableData.forEach(function(inspection) {
      akaname = inspection.AKA_name
      bizzaddress = inspection.Address
      tableinfoentry = [inspection.Inspection_ID, inspection.AKA_name, inspection.Address, inspection.Inspection_date, inspection.Inspection_type, inspection.Results, inspection.violation_code, inspection.violation_subject, inspection.Violations]
      if (bv === akaname && av ==="Choose...") {
        var row = tbody.append("tr");
        Object.entries(tableinfoentry).forEach(function([key, value]) {
            console.log(key, value);
            var cell = row.append("td");
            cell.text(value)
      })}
      else if (bv === akaname && av === bizzaddress) {
        var row = tbody.append("tr");
        Object.entries(tableinfoentry).forEach(function([key, value]) {
            console.log(key, value);
            var cell = row.append("td");
            cell.text(value);
      })};
    });
  };

  //Handle the Actions on the Page
  var filterbutton = d3.select("#submitbutton");
  filterbutton.on("click", handleSubmit);

});