$(function () {
    $.getJSON('../json/home.json')
        .then(function (res) {

            //树形图
            var channelForce = echarts.init(document.getElementById('channelForce'));
            var channelForce_option = {
                title: {
                    text: '乘用车车型结构',
                    left:10,
                    top:10
                },
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove',
                },
                series: [
                    {
                        type: 'sankey',
                        layout:'none',
                        data: res.nodes,
                        links: res.links,
                        nodeWidth:50,
                        nodeGap:14,
                        label:{
                            normal:{
                                show:true,
                                formatter:'{b}:{c}（万）'
                                /*formatter :function(params){
                                    var data = res.nodes;
                                    for(var i = 0; i < data.length;i++){
                                        var obj = {};
                                        var name = data[i].name;
                                        var value = data[i].value;
                                        obj.name = name;
                                        obj.value = value
                                        return obj.name + ':' + obj.value;
                                    }
                                },*/
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                borderColor: '#aaa'
                            }
                        },
                        lineStyle: {
                            normal: {
                                curveness: 0.5
                            }
                        }
                    }
                ]
            };
            channelForce.setOption(channelForce_option);
            //燃油车新能源
            var channel_onePie = echarts.init(document.getElementById('channel_onePie'));
            var onePie_option = {
                title: {
                    text: '燃油车/新能源占比',
                    x: 'left',
                    padding: [10, 400, 10, 10],
                    backgroundColor: '#eee',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}万 ({d}%)"
                },
                series: [
                    {
                        name: 'BYD',
                        type: 'pie',
                        radius: ['30%', '45%'],
                        center: ['50%', '60%'],
                        startAngle: 150,
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: '14',
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        itemStyle:{
                            normal:{
                                label:{
                                    formatter:'{b}:{d}%'
                                },
                            },
                        },
                        data:[
                            {value:435, name:'新能源'},
                            {value:610, name:'燃油车'}
                        ]
                    }
                ]
            };
            channel_onePie.setOption(onePie_option);

            //Top10车系
            var channel_twoTopPie = echarts.init(document.getElementById('channel_twoTopPie'));
            var twoTopPie_option = {
                title: {
                    text: '车系',
                    x: 'left',
                    padding: [10, 400, 10, 10],
                    backgroundColor: '#eee',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}辆 ({d}%)"
                },
                series: [
                    {
                        name: 'BYD',
                        type: 'pie',
                        radius: ['30%', '45%'],
                        center: ['50%', '60%'],
                        startAngle: 70,
                        label: {
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        itemStyle:{
                            normal:{
                                label:{
                                    formatter:'{b}:{d}%'
                                },
                            },
                        },
                        labelLine:{
                            normal:{
                                length:8,
                                length2:5,
                            },
                        },
                        data:[
                            {value:30035, name:'自主'},
                            {value:30010, name:'美系'},
                            {value:20034, name:'日系'},
                            {value:10035, name:'法系'},
                            {value:50048, name:'德系'},
                            {value:90048, name:'其他'}
                        ]
                    }
                ]
            };
            channel_twoTopPie.setOption(twoTopPie_option);

            //Top10车企
            var channel_threeTopPie = echarts.init(document.getElementById('channel_threeTopPie'));
            var threeTopPie_option = {
                title: {
                    text: 'Top10车企',
                    x: 'left',
                    padding: [10, 500, 10, 10],
                    backgroundColor: '#eee',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}辆 ({d}%)"
                },
                series: [
                    {
                        name: 'BYD',
                        type: 'pie',
                        radius: ['30%', '45%'],
                        center: ['48%', '60%'],
                        label: {
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        itemStyle:{
                            normal:{
                                label:{
                                    formatter:'{b}:{d}%'
                                },
                            },
                        },
                        labelLine:{
                            normal:{
                                length:8,
                                length2:5,
                            },
                        },
                        data:[
                            {value:145790, name:'上汽大众'},
                            {value:136312, name:'一汽大众'},
                            {value:131342, name:'上汽通用'},
                            {value:91697, name:'上通五菱'},
                            {value:75197, name:'东风日产'},
                            {value:71866, name:'北京现代'},
                            {value:68341, name:'重庆长安'},
                            {value:63359, name:'长安福特'},
                            {value:51569, name:'长城汽车'},
                            {value:51184, name:'一汽丰田'},
                            {value:95432, name:'其他'},
                        ]
                    }
                ]
            };
            channel_threeTopPie.setOption(threeTopPie_option);

            //top10品牌
            var channel_twoBottomPie = echarts.init(document.getElementById('channel_twoBottomPie'));
            var twoBottomPie_option = {
                title: {
                    text: 'top10品牌',
                    x: 'left',
                    padding: [10, 500, 10, 10],
                    backgroundColor: '#eee',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}辆 ({d}%)"
                },
                series: [
                    {
                        name: 'BYD',
                        type: 'pie',
                        radius: ['30%', '45%'],
                        avoidLabelOverlap: false,
                        center: ['50%', '60%'],
                        startAngle: 120,
                        minAngle:25,
                        label: {
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        itemStyle:{
                            normal:{
                                label:{
                                    formatter:'{b}:{d}%'
                                },
                            },
                        },
                        labelLine:{
                            normal:{
                                length:8,
                                length2:5,
                            },
                        },
                        data:[
                            {value:214256, name:'大众'},
                            {value:92982, name:'别克'},
                            {value:87889, name:'本田'},
                            {value:85526, name:'丰田'},
                            {value:71866, name:'现代'},
                            {value:68733, name:'日产'},
                            {value:68341, name:'长安'},
                            {value:64414, name:'福特'},
                            {value:53517, name:'五菱'},
                            {value:47013, name:'哈弗'},
                        ]
                    }
                ]
            };
            channel_twoBottomPie.setOption(twoBottomPie_option);

            //top10车型
            var channel_threeBottomPie = echarts.init(document.getElementById('channel_threeBottomPie'));
            var threeBottomPie_option = {
                title: {
                    text: 'top10车型',
                    x: 'left',
                    padding: [10, 500, 10, 10],
                    backgroundColor: '#eee',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}辆 ({d}%)"
                },
                series: [
                    {
                        name: 'BYD',
                        type: 'pie',
                        radius: ['30%', '45%'],
                        center: ['50%', '60%'],
                        startAngle: 100,
                        label: {
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        itemStyle:{
                            normal:{
                                label:{
                                    formatter:'{b}:{d}%'
                                },
                            },
                        },
                        labelLine:{
                            normal:{
                                length:8,
                                length2:5,
                            },
                        },
                        data:[
                            {value:38450, name:'五菱宏光'},
                            {value:35933, name:'朗逸'},
                            {value:32477, name:'哈弗h6'},
                            {value:29322, name:'英朗GT'},
                            {value:28455, name:'捷达'},
                            {value:26545, name:'速腾'},
                            {value:23674, name:'桑塔纳'},
                            {value:23223, name:'卡罗拉'},
                            {value:21339, name:'轩逸'},
                            {value:20346, name:'传祺GS4'},
                        ]
                    }
                ]
            };
            channel_threeBottomPie.setOption(threeBottomPie_option);
        })
})
