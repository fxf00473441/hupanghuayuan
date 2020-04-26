
var dataView1;
var grid1;
var data1 = [];
var columns1 =[] ;

columns1 = [
  {id: "id", name: "终端mac地址", field: "id",width: 160,  minWidth: 140, cssClass: "cell-title", sortable: true},
  {id: "room_num", name: "管辖区域", field: "room_num",width: 160,  minWidth: 140, cssClass: "cell-title", sortable: true},
  {id: "wifi", name: "连接wifi", field: "wifi",width: 160, minWidth: 140,  sortable: true},
  {id: "version", name: "终端版本", field: "version", width: 120, minWidth: 120, cssClass: "cell-title",  sortable: true},
  {id: "finger_version", name: "指纹库版本", field: "finger_version",width: 120, minWidth: 100, cssClass: "cell-title", sortable: true},
  {id: "status", name: "状态", field: "status", width: 120,  minWidth: 100, cssClass: "cell-title", sortable: true},
  {id: "operation_clo", name: "操作", width: 140, maxWidth: 140, cssClass: "cell-effort-driven", field: "effortDriven", formatter: buttonFormatter}
];

var options = {
  columnPicker: {
    columnTitle: "Columns",
    hideForceFitButton: false,
    hideSyncResizeButton: false,
    forceFitTitle: "Force fit columns",
    syncResizeTitle: "Synchronous resize",
  },
  editable: true,
  enableAddRow: true,
  enableCellNavigation: true,
  asyncEditorLoading: true,
  forceFitColumns: false,
  topPanelHeight: 25
};

function buttonFormatter(row,cell,value,columnDef,dataContext){  
    var button = "<input class='del' type='button' id='del_button' value='删除' title='删除'/><input class='del' style='margin-left:5px;' type='button' id='detail_button' value='详情' title='详情'/>";
    //the id is so that you can identify the row when the particular button is clicked
    return button;
    //Now the row will display your button
}

var sortcol = "title";
var sortdir = 1;
var percentCompleteThreshold = 0;
var searchString = "";

function requiredFieldValidator(value) {
  if (value == null || value == undefined || !value.length) {
    return {valid: false, msg: "This is a required field"};
  }
  else {
    return {valid: true, msg: null};
  }
}

function myFilter(item, args) {
  if (item["percentComplete"] < args.percentCompleteThreshold) {
    return false;
  }

  if (args.searchString != "" && item["title"].indexOf(args.searchString) == -1) {
    return false;
  }

  return true;
}

function percentCompleteSort(a, b) {
  return a["percentComplete"] - b["percentComplete"];
}

function comparer(a, b) {
  var x = a[sortcol], y = b[sortcol];
  return (x == y ? 0 : (x > y ? 1 : -1));
}

function toggleFilterRow() {
  grid1.setTopPanelVisibility(!grid1.getOptions().showTopPanel);
}


$(".grid-header .ui-icon")
        .addClass("ui-state-default ui-corner-all")
        .mouseover(function (e) {
          $(e.target).addClass("ui-state-hover")
        })
        .mouseout(function (e) {
          $(e.target).removeClass("ui-state-hover")
        });

$(function () {
  dataView1 = new Slick.Data.DataView({ inlineFilters: true });
  grid1 = new Slick.Grid("#device_list", dataView1, columns1, options);
  grid1.setSelectionModel(new Slick.RowSelectionModel());
  
  var pager = new Slick.Controls.Pager(dataView1, grid1, $("#device_pager"));
  var columnpicker = new Slick.Controls.ColumnPicker(columns1, grid1, options);


  // move the filter panel defined in a hidden div into grid top panel
  $("#inlineFilterPanel")
      .appendTo(grid1.getTopPanel())
      .show();

  grid1.onCellChange.subscribe(function (e, args) {
    dataView1.updateItem(args.item.id, args.item);
  });

  grid1.onAddNewRow.subscribe(function (e, args) {
    var item = {"num": data.length, "id": "new_" + (Math.round(Math.random() * 10000)), "title": "New task", "duration": "1 day", "percentComplete": 0, "start": "01/01/2009", "finish": "01/01/2009", "effortDriven": false};
    $.extend(item, args.item);
    dataView1.addItem(item);
  });

  grid1.onKeyDown.subscribe(function (e) {
    // select all rows on ctrl-a
    if (e.which != 65 || !e.ctrlKey) {
      return false;
    }

    var rows = [];
    for (var i = 0; i < dataView1.getLength(); i++) {
      rows.push(i);
    }

    grid1.setSelectedRows(rows);
    e.preventDefault();
  });
  
  grid1.onSort.subscribe(function (e, args) {
    sortdir = args.sortAsc ? 1 : -1;
    sortcol = args.sortCol.field;

    if (isIEPreVer9()) {
      // using temporary Object.prototype.toString override
      // more limited and does lexicographic sort only by default, but can be much faster

      var percentCompleteValueFn = function () {
        var val = this["percentComplete"];
        if (val < 10) {
          return "00" + val;
        } else if (val < 100) {
          return "0" + val;
        } else {
          return val;
        }
      };

      // use numeric sort of % and lexicographic for everything else
      dataView1.fastSort((sortcol == "percentComplete") ? percentCompleteValueFn : sortcol, args.sortAsc);
    } else {
      // using native sort with comparer
      // preferred method but can be very slow in IE with huge datasets
      dataView1.sort(comparer, args.sortAsc);
    }
  });

  // wire up model events to drive the grid
  // !! both dataView.onRowCountChanged and dataView.onRowsChanged MUST be wired to correctly update the grid
  // see Issue#91
  dataView1.onRowCountChanged.subscribe(function (e, args) {
    grid1.updateRowCount();
    grid1.render();
  });

  dataView1.onRowsChanged.subscribe(function (e, args) {
    grid1.invalidateRows(args.rows);
    grid1.render();
  });

 grid1.onSelectedRowsChanged.subscribe(function (e, args) {
        // debugging to see the active row in response to questions
        // active row has no correlation to the selected rows
        // it will remain null until a row is clicked and made active
        // selecting and deselecting rows via checkboxes will not change the active row
        var rtn = args.grid.getActiveCell();
        var x = args.rows;
    });
  
  dataView1.onPagingInfoChanged.subscribe(function (e, pagingInfo) {
    grid1.updatePagingStatusFromView( pagingInfo );

    // show the pagingInfo but remove the dataView from the object, just for the Cypress E2E test
    delete pagingInfo.dataView;
    console.log('on After Paging Info Changed - New Paging:: ', pagingInfo);
  });

  dataView1.onBeforePagingInfoChanged.subscribe(function (e, previousPagingInfo) {
    // show the previous pagingInfo but remove the dataView from the object, just for the Cypress E2E test
    delete previousPagingInfo.dataView;
    console.log('on Before Paging Info Changed - Previous Paging:: ', previousPagingInfo);
  });

  var h_runfilters = null;

  // wire up the slider to apply the filter to the model
  $("#pcSlider,#pcSlider2").slider({
    "range": "min",
    "slide": function (event, ui) {
      Slick.GlobalEditorLock.cancelCurrentEdit();

      if (percentCompleteThreshold != ui.value) {
        window.clearTimeout(h_runfilters);
        h_runfilters = window.setTimeout(updateFilter, 10);
        percentCompleteThreshold = ui.value;
      }
    }
  });


  // wire up the search textbox to apply the filter to the model
  $("#txtSearch,#txtSearch2").keyup(function (e) {
    Slick.GlobalEditorLock.cancelCurrentEdit();

    // clear on Esc
    if (e.which == 27) {
      this.value = "";
    }

    searchString = this.value;
    updateFilter();
  });

  function updateFilter() {
    dataView1.setFilterArgs({
      percentCompleteThreshold: percentCompleteThreshold,
      searchString: searchString
    });
    dataView1.refresh();
  }

  grid1.onClick.subscribe(function (e) {
      var cell = grid1.getCellFromEvent(e);
      if(cell == undefined || cell ==null){
	     return;
      }
      if (grid1.getColumns()[cell.cell].id == "operation_clo") {
        if(e.target.id == "detail_button"){
	        showDetail();
        }
        if(e.target.id == "del_button"){
	        alert("delete tenant");
        }
      }
    });

  // initialize the model after all the events have been hooked up
  dataView1.beginUpdate();
  dataView1.setItems(data1);
  dataView1.setFilterArgs({
    percentCompleteThreshold: percentCompleteThreshold,
    searchString: searchString
  });
  dataView1.setFilter(myFilter);
  dataView1.endUpdate();

  // if you don't want the items that are not visible (due to being filtered out
  // or being on a different page) to stay selected, pass 'false' to the second arg
  dataView1.syncGridSelection(grid1, true);
  $("#gridContainer").resizable();
  //listTenant();
})