$(document).ready(function () {
    $.getJSON('../json/home.json')
        .then(function (res) {
            var provinces = res.provinceIevel;   //地区
            var allDate  //时间筛选结果

            //页面初始化
            //KPI
            /*$('.sales').html(res.allSales / 10000 + '万');
            $('.proxy').html(res.allProxy / 10000 + '%');*/

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
                    position: function (pt) {
                        return [pt[0], '10%'];
                    },
                    formatter: '{b}<br />{a0}: {c0}'+'（万）<br />{a1}: {c1}'+'（%）'
                },
                legend: {
                    top:10,
                    data:['销量','增速'],
                },
                grid: {
                    top: '25%',
                    left: '5%',
                    right: '30%',
                    bottom: '10%',
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
                    position: function (pt) {
                        return [pt[0], '10%'];
                    },
                    formatter: '{b}<br />{a0}: {c0}'+'（万）<br />{a1}: {c1}'+'（%）'
                },
                legend: {
                    top:10,
                    data:['销量','增速'],
                },
                grid: {
                    top: '25%',
                    left: '30%',
                    right: '5%',
                    bottom: '10%',
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

            //中国地图
            $.ajax({
                url: '../json/geoJson/area.geo.json',
                async: false,
                success: function (chinaJson) {
                    echarts.registerMap('china', chinaJson);
                }
            })
            var homeChina = echarts.init(document.getElementById('homeChina'));
            var chinaOption = {
                color:['#FF4455','#568EFD'],
                title: {
                    text: '全国片区销量热点分布',
                    top:10,
                    left: 10,
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a}：<br />{b}：{c}（万）',
                },
                visualMap: {
                    min: 100,
                    max: 300,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'],           // 文本，默认为数值文本
                    calculable: true,
                    color: ['orangered','yellow','lightskyblue' ]
                },
                series: [
                    {
                        name: '销量',
                        type: 'map',
                        mapType: 'china',
                        selectedMode: 'single',
                        left:60,
                        zoom: 1.2,
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:res.provinceIevel.map(function(item){
                            var value = item.value / 10000
                            return {name:item.name,value:value}
                        })
                    }
                ]
            };
            homeChina.setOption(chinaOption);

            //柱状图
            var homeBar = echarts.init(document.getElementById('homeBar'));
            var barOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: '{b}<br />{a0}: {c0}'+'（万）<br />{a1}: {c1}'+'（%）'
                },
                legend: {
                    data: ['销量', '增速'],
                    top:25,
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    axisLabel:{
                        interval:0,
                    },
                    data: res.provinceIevel.map(function (item) {
                        return item.name
                    })
                },
                yAxis: [
                    {
                        type: 'value',
                        name:'万台'
                    },
                    {
                        type: 'value',
                        name:'增速',
                        max: 5
                    }
                ],
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        yAxisIndex: 0,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: res.provinceIevel.map(function (item) {
                            return item.areaSales / 10000
                        })
                    },
                    {
                        name: '增速',
                        type: 'line',
                        yAxisIndex: 1,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: res.provinceIevel.map(function (item) {
                            return item.areaProxy / 10000
                        })
                    }
                ]
            };
            homeBar.setOption(barOption);
            echarts.connect([homeChina, homeBar]);

            //地图点击方法
            function homeChinaClick(data) {
                barOption.xAxis.data = data.map(function (item) {
                    return item.name
                });
                barOption.series[0].data = data.map(function (item) {
                    return item.departmentSales / 10000
                });
                barOption.series[1].data = data.map(function (item) {
                    return item.departmentProxy / 10000
                });
                homeBar.setOption(barOption);
                homeChina.group = ' ';   //取消图形联动
            }

            //柱状图点击方法
            function homeBarClick(data) {
                barOption.xAxis.data = data.map(function (item) {
                    return item.name
                })
                barOption.series[0].data = data.map(function (item) {
                    return item.areaSales / 10000
                })
                barOption.series[1].data = data.map(function (item) {
                    return item.areaProxy /10000
                })
                homeBar.setOption(barOption);
                echarts.connect([homeChina, homeBar]);
                window.flag = 0;
            }

            //地图初始化点击事件  层叠柱状图下钻
            homeChina.on('click', function (param) {
                /*if(!window.flag) {*/
                if (allDate == undefined || allDate[3] == undefined) {  //初始化点击
                    window.flag = 1;
                    var dataIndex = param.dataIndex;
                    var data = res.provinceIevel[dataIndex].department;
                    homeChinaClick(data)
                } else {
                    window.flag = 1;
                    var dataIndex = param.dataIndex;
                    var data = res.provinceIevel2[dataIndex].department;
                    homeChinaClick(data)
                }
            })

            //柱状图初始化点击事件返回
            homeBar.on('click', function (param) {
                if (allDate == undefined || allDate[3] == undefined) {  //初始化点击
                    var data = res.provinceIevel
                    homeBarClick(data)
                } else {
                    var data = res.provinceIevel2;
                    homeBarClick(data)
                }
            });

        })
})
