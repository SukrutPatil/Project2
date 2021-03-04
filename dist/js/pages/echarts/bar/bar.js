$(function() {
    "use strict";
    // ------------------------------
    // Basic bar chart
    // ------------------------------
    // based on prepared DOM, initialize echarts instance
        var myChart = echarts.init(document.getElementById('basic-bar'));

        // specify chart configuration item and data
        var option = {
                // Setup grid
                grid: {
                    left: '1%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },

                // Add Tooltip
                tooltip : {
                    trigger: 'axis'
                },

                legend: {
                    data:['Site A']
                },
                toolbox: {
                    show : true,
                    feature : {

                        magicType : {show: true, type: ['bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                color: ["#1e88e5", "#00acc1"],
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data :['Num 0','Num 1','Num 2','Num 3','Num Num 4','Num 5','Num 6','Num 7','Num 8','Num 9']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Site A',
                        type:'bar',
                        data:[500,142,156,220,45,58,878,825,981, 99],
                        markPoint : {
                            data : [
                                {type : 'max', name: 'Max'},
                                {type : 'min', name: 'Min'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: 'Average'}
                            ]
                        
                    },
                    
                  }
                ]
            };
        // use configuration item and data specified to show chart
        myChart.setOption(option);
    
    
      
        
   
    
       //------------------------------------------------------
       // Resize chart on menu width change and window resize
       //------------------------------------------------------
        $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".sidebartoggler").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function() {

                        // Resize chart
                        myChart.resize();
                        stackedChart.resize();
                        stackedbarcolumnChart.resize();
                        barbasicChart.resize();
                    }, 200);
                }
            });
});