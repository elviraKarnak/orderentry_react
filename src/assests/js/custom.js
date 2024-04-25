$(".toggle_menu").click(function(){
  $('.parent_layout-wrap').toggleClass('layoutVisible')  
})

$( function() {
    $( ".datepicker" ).datepicker();
  } );

  $('.data_view-nav ul li a').on('click', function(evt) {
    evt.preventDefault();
    $(this).toggleClass('active');
    var sel = this.getAttribute('data-toggle-target');
    $('.data_tab-content').removeClass('active').filter(sel).addClass('active');
  });

  $(function(){
    $("#myDummyTable").tablesorter({widgets: ['zebra']});
    $.extend($.tablesorter.themes.bootstrap, {
    // table classes
    table: 'table table-bordered table-striped',
    caption: 'caption',
    // *** header class names ***
    // header classes
    header: 'bootstrap-header',
    sortNone: '',
    sortAsc: '',
    sortDesc: '',
    // applied when column is sorted
    active: '',
    // hover class
    hover: '',
    // *** icon class names ***
    // icon class added to the <i> in the header
    icons: '',
    // class name added to icon when column is not sorted
    iconSortNone: 'bootstrap-icon-unsorted',
    // class name added to icon when column has ascending sort
    iconSortAsc: 'icon-chevron-up glyphicon glyphicon-chevron-up sort-asc',
    // class name added to icon when column has descending sort
    iconSortDesc: 'icon-chevron-down glyphicon glyphicon-chevron-down',
    filterRow: '',
    footerRow: '',
    footerCells: '',
    // even row zebra striping
    even: '',
    // odd row zebra striping
    odd: ''
  });
  });

  $('[name=tab]').each(function(i,d){
    var p = $(this).prop('checked');
  //   console.log(p);
    if(p){
      $('.data_radio-hold').eq(i)
        .addClass('on');
    }    
  });  
  
  $('[name=tab]').on('change', function(){
    var p = $(this).prop('checked');
    
    // $(type).index(this) == nth-of-type
    var i = $('[name=tab]').index(this);
    
    $('.data_radio-hold').removeClass('on');
    $('.data_radio-hold').eq(i).addClass('on');
  });