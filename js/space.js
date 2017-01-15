$(function() {
    $.getJSON('../json/home.json')
        .then(function (res) {
            var provinces = res.selectOne;
            var allDate;

            //系别走势图
            var spaceBar = echarts.init(document.getElementById('spaceBar'));
            var spaceBarOption = {
                title : {
                    text: '系别走势图',
                    left:10,
                    top:10
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: '{b}<br />{a0}: {c0}'+'（万台）<br />{a1}: {c1}'+'（万台）<br />{a2}: {c2}'+'（万台）<br />{a3}: {c3}'+'（万台）<br />{a4}: {c4}'+'（万台）<br />{a5}: {c5}'+'（万台）'
                },
                legend: {
                    right:10,
                    top:45,
                    data:['自主','美系','日系','德系','法系','韩系']
                },
                grid: {
                    top:'22%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel:{
                            interval:0,
                        },
                        data : res.spaceData[1].travelers.map(function(item){return item.name})
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'自主',
                        type:'bar',
                        stack: '广告',
                        data:res.spaceData[1].travelers.map(function(item){
                            return item.areaSales[0].value / 10000;
                        })
                    },
                    {
                        name:'美系',
                        type:'bar',
                        stack: '广告',
                        data:res.spaceData[1].travelers.map(function(item){
                            return item.areaSales[1].value / 10000;
                        })
                    },
                    {
                        name:'日系',
                        type:'bar',
                        stack: '广告',
                        data:res.spaceData[1].travelers.map(function(item){
                            return item.areaSales[2].value / 10000;
                        })
                    },
                    {
                        name: '德系',
                        type: 'bar',
                        stack: '广告',
                        data: res.spaceData[1].travelers.map(function (item) {
                            return item.areaSales[3].value / 10000;
                        })
                    },
                    {
                        name:'法系',
                        type:'bar',
                        stack: '广告',
                        data:res.spaceData[1].travelers.map(function (item) {
                            return item.areaSales[4].value / 10000;
                        })
                    },
                    {
                        name:'韩系',
                        type:'bar',
                        stack: '广告',
                        data:res.spaceData[1].travelers.map(function (item) {
                            return item.areaSales[5].value / 10000;
                        })
                    }
                ]
            };
            spaceBar.setOption(spaceBarOption);

            //南丁格尔玫瑰图
            var spacePie = echarts.init(document.getElementById('spacePie'));
            var spacePieOption = {
                title : {
                    text: '总体车型占比图',
                    x:'center',
                    top:10
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c}万台 ({d}%)"
                },
                legend: {
                    x : 'center',
                    bottom : 20,
                    data:res.spaceData[0].total.map(function(item){return item.name})
                },
                calculable : true,
                series : [
                    {
                        name:'面积模式',
                        type:'pie',
                        radius : ['30%','56%'],
                        center : ['50%', '50%'],
                        roseType : 'area',
                        startAngle: 130,
                        itemStyle:{
                            normal:{
                                label:{
                                    formatter:'{b}:{d}%'
                                },
                            },
                        },
                        data:res.spaceData[0].total.map(function(item){
                            var value = item.value / 10000
                            return {name:item.name,value:value}
                        })
                    }
                ]
            };
            spacePie.setOption(spacePieOption);

            //柱状图点击方法
            var barCount;
            function travelersBar(data){
                spacePieOption.title.text = data.monthName
                spacePieOption.series[0].data = data.numberOfSheets.map(function(item){
                    var value = item.value / 10000
                    return {name:item.name,value:value}
                });
                spacePie.setOption(spacePieOption);
            }
            //柱状图点击事件
            spaceBar.on('click',function(param){
                var dataIndex = param.dataIndex;
                barCount = dataIndex;
                var data = res.spaceData[1].travelers[dataIndex]
                travelersBar(data)

            })

            //南丁格尔玫瑰图点击事件
            spacePie.on('click',function(param){
                //var pieClickIndex = param.dataIndex
                var pieClickName = param.name
                if(pieClickName != 'SUV' && pieClickName != 'A0级'){return}
                if(pieClickName == 'SUV'){
                    if(barCount == undefined){
                        var pieData = res.apscePieClick[0].total;
                    }else{
                        var pieData = res.apscePieClick[0].contentData[barCount];
                    }
                }else{
                    if(barCount == undefined){
                        var pieData = res.apscePieClick[0].totalA0;
                    }else{
                        var pieData = res.apscePieClick[0].contentDataA0[barCount];
                    }
                }
                pieClickMethod(pieData,barCount,pieClickName)
            })

            function pieClickMethod(data,count,name){
                spacePieOption.tooltip.formatter = "{b} : {c}台 ({d}%)"
                if(name == 'SUV'){
                    spacePieOption.legend.data = res.apscePieClick[0].total.map(function(item){return item.name})
                }else{
                    spacePieOption.legend.data = res.apscePieClick[0].totalA0.map(function(item){return item.name})
                }
                if(count == undefined){
                    spacePieOption.series[0].data = data.map(function(item){
                        var value = item.value
                        return {name:item.name,value:value}
                    });
                }else{
                    spacePieOption.series[0].data = data.monthData.map(function(item){
                        var value = item.value
                        return {name:item.name,value:value}
                    });
                }
                spacePie.setOption(spacePieOption);
            }
        })
})
