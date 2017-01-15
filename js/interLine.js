$(function() {
    $.getJSON('../json/home.json')
    .then(function (res) {
        var provinces = res.selectOne;
        var allDate;

        //销售整体年度趋势
        var homeLineZH = echarts.init(document.getElementById('homeLineZH'));
        var lineZHOption = {
            title: {
                left: 'left',
                text: '销售整体年度趋势',
                top:6,
            },
            tooltip: {
                trigger: 'axis',
                /*position: function (pt) {
                    return [pt[1], '20%'];
                },*/
                position: [10, 10],
                formatter: '{b}<br />{a0}: {c0}'+'（万）<br />{a1}: {c1}'+'（%）'
            },
            legend: {
                top:10,
                right:10,
                data:['销量','增速'],
            },
            grid: {
                top: '35%',
                left: '5%',
                right: '5%',
                bottom: '8%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: res.allDate.map(function (item) {
                    return item.date
                })
            },
            yAxis: [
                {
                    type:'value',
                    name:"万台",
                    splitLine: {
                        show: false
                    }
                },
                {
                    type: 'value',
                    name:"增速(%)",
                    max: 1,
                    splitLine: {
                        show: false
                    }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    startValue: '2010',
                    endValue: '2016',
                    filterMode: 'filter'
                },
                {
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    realtime: false,
                    height:14,
                    bottom:5,
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
            series: [
                {
                    name: '销量',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 0,
                    data: res.allDate.map(function (item) {
                        return item.sales / 10000
                    })
                },
                {
                    name: '增速',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                    data: res.allDate.map(function (item) {
                        return item.proxy / 10000
                    })
                }
            ]
        };
        homeLineZH.setOption(lineZHOption);

        //销售整体月度走势
        var homeLineXS = echarts.init(document.getElementById('homeLineXS'));
        var lineXSOption = {
            title: {
                left: 'left',
                text: '销售整体月度走势',
                top:6,
            },
            tooltip: {
                trigger: 'axis',
                /*position: function (pt) {
                    return [pt[0], '10%'];
                },*/
                position:[10,10],
                formatter: '{b}<br />{a0}: {c0}'+'（万）<br />{a1}: {c1}'+'（%）'
            },
            legend: {
                top:10,
                right:10,
                data:['销量','增速'],
            },
            grid: {
                top: '35%',
                left: '5%',
                right: '5%',
                bottom: '8%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: res.allDate2.map(function (item) {
                    return item.date
                })
            },
            yAxis: [
                {
                    type:'value',
                    name:"万台",
                    splitLine: {
                        show: false
                    }
                },
                {
                    type: 'value',
                    name:"增速(%)",
                    max: 1,
                    splitLine: {
                        show: false
                    }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    startValue: '2015-10',
                    endValue: '2016-05',
                    filterMode: 'filter'
                },
                {
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    realtime: false,
                    height:14,
                    bottom:5,
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
            series: [
                {
                    name: '销量',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 0,
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    data: res.allDate2.map(function (item) {
                        return item.sales / 10000
                    })
                },
                {
                    name: '增速',
                    type: 'line',
                    yAxisIndex: 1,
                    smooth: true,
                    data: res.allDate2.map(function (item) {
                        return item.proxy / 10000
                    })
                }
            ]
        };
        homeLineXS.setOption(lineXSOption);

        //地图
        $.ajax({
            url:'../json/china.json',
            async:false,
            success:function(chinaJson){
                echarts.registerMap('china',chinaJson);
            }
        })
        var interLineChina = echarts.init(document.getElementById('interLineChina'));
        var geoCoordMap = {
            '丽江': [100.25,26.86],
            '绵阳': [104.73,31.48],
            '成都': [103.9526,30.7617],
            '拉萨': [91.1865,30.1465],
            '昆明': [102.9199,25.4663],
            '杭州': [119.5313,29.8773],
            '西宁': [101.4038,36.8207],
            '西安': [109.1162,34.2004],
            '重庆': [107.7539,30.1904],
            '深圳': [114.5435,22.5439],
        };
        var LSData = res.interLineData[0].interLineChina[0].LSData;
        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };

        var color = ['#a6c84c'];
        var series = [];
        [['深圳', LSData]].forEach(function (item, i) {
            series.push({
                name: item[0],
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color:'#E2E434', //color[1],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0],
                type: 'lines',
                zlevel: 2,
                /*symbol: ['diamond'],
                symbolSize: 10,*/
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: '#E87631',
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 6;
                },
                itemStyle: {
                    normal: {
                        color: '#E87631'
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
        });
        var chinaOption = {
            backgroundColor: '#ccc',
            tooltip : {
                trigger: 'item',
                formatter:function(obj){
                    var name = obj.name;
                    if(name !== ''){
                        var value = obj.data.value[2];
                        return name + '：' + value + '(辆)'
                    }
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                zoom:1.5,
                roam:'scale',
                top:20,
                left:'10%',
                itemStyle: {
                    normal: {
                        areaColor: '#C2D3D4',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#C2D3D4'
                    }
                }
            },
            series: series
        };
        interLineChina.setOption(chinaOption);
    })
})
