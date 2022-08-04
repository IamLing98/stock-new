import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

// material-ui
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import MainCard from './../../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../../store/constant';

import { FoamTree } from '@carrotsearch/foamtree';

import Tooltip from './Poper';

import './style.css';
import config from '../../../../config';
import { padding } from '@mui/system';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: '#fff',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative'
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[800],
        marginTop: '8px'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200],
        zIndex: 1
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.secondary[200]
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.smallAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    }
}));



var tooltip = (function () {
    var tip = new Tooltip('Detail', { auto: true });
    var shown = false;
    var timeout;
    var lastShownPageX, lastShownPageY;
    var pageX, pageY;
    var currentGroup;

    function hide() {
        tip.hide();
        shown = false;
        window.clearTimeout(timeout);
    }

    function show() {
        if (currentGroup && currentGroup.label) {
            // Set some example content on the tooltip.
            tip.content(
                'Mã CP: <button style="font-size: 20px">' +
                currentGroup.label +
                '</button><br />' +
                'Tên doanh nghiệp: <strong>' +
                currentGroup.stockName +
                '</strong><br />' +
                'Vốn hoá TT: <strong>' +
                currentGroup.weight +
                '</strong> <br />' +
                'Volume Giao dịch: <strong>' +
                currentGroup._tvol_ +
                '</strong><br />' +
                'Giá đóng cửa: <strong>' +
                currentGroup._cp_ +
                '</strong><br />'
            );
            tip.position(pageX, pageY);
            tip.show();
            lastShownPageX = pageX;
            lastShownPageY = pageY;
            shown = true;
        }
    }

    function group(g) {
        currentGroup = g;
    }

    // Register a mouse move listener that will show and hide the tooltip.
    document.body.addEventListener('mousemove', function (e) {
        pageX = e.pageX;
        pageY = e.pageY;

        // Hide if the mouse pointer gets farther than 10px from the last tooltip location
        if (shown && Math.sqrt(Math.pow(pageX - lastShownPageX, 2) + Math.pow(pageY - lastShownPageY, 2)) > 10) {
            hide();
        }

        // Show the tooltip after the pointer stops for some time
        window.clearTimeout(timeout);
        timeout = window.setTimeout(show, 500);
    });

    return {
        group: group,
        hide: hide
    };
})();


const MultilevelTreeMap = (props) => {
    const account = useSelector((state) => state.account);
    const chartID = props.chartID;
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState('all');
    const [lstSelect, setLstSelect] = useState([]);

    const handleChangeSelect = (event) => {
        setSelect(event.target.value);
    };

    useEffect(() => {
        document.getElementById(chartID).removeAttribute('data-foamtree');

        getData();
        if (chartData && chartData.length > 0) {
            generateChart();
        }

    }, [select, JSON.stringify(chartData)]);

    const getData = async () => {
        await axios
            .get(config.API_SERVER + `stock/heapTree`, { headers: { Authorization: `Bearer ${account.token}` } })
            .then(async (res) => {
                let data = res?.data;
                await setChartData(data.data);
                if (chartID === 'nganh') {
                    await setLstSelect([...new Set(data.data.map((val) => val._in_))])
                } else {
                    await setLstSelect([...new Set(data.data.map((val) => val.catID == 1 ? 'HOSE' : val.catID == 2 ? 'HNX' : 'UPCOM'))])
                }
            })
            .catch((err) => err);
    };

    const generateChart = () => {
        const foamtree = new FoamTree({
            id: chartID,
            layout: 'squarified',
            layoutByWeightOrder: true,
            stacking: 'flattened',
            showZeroWeightGroups: true,
            // Never display the title bar
            maxLabelSizeForTitleBar: 0,
            dataObject: {
                groups: processData(chartID, select)
            }
        });

        //Resize
        window.addEventListener("resize", (function() {
            var timeout;
            return function() {
              window.clearTimeout(timeout);
              timeout = window.setTimeout(foamtree.resize, 300);
            };
          })());
        window.addEventListener("orientationchange", function() {
            foamtree.resize();
          });

        foamtree.set('groupSelectionOutlineColor', 'red');
        foamtree.set({
            //Customize label layout on description groups
            groupLabelLayoutDecorator: function (opts, params, vars) {
                if (params.description) {
                    vars.verticalPadding = 0.1;
                    vars.maxTotalTextHeight = 1.0;
                } else if (params.group.label) {
                    vars.maxFontSize = 16;
                }
            },

            //Render readout value as the label
            groupLabelDecorator: function (opts, params, vars) {
                var readout = params.group;
                if (readout) {
                    var fixrate = readout._pc_ != undefined ? readout._pc_ + '%' : '';
                    vars.labelText += '\n' + fixrate;
                }
            },

            //color
            groupColorDecorator: function (opts, params, vars) {
                var _cp_ = params.group._cp_; // dong cua
                var _bp_ = params.group._bp_; // tham chieu
                var _fp_ = params.group._fp_; // san
                var _clp_ = params.group._clp_; // tran

                if (params.level == 1) {
                    //Dung gia
                    if (_cp_ == _bp_) {
                        // Make positive groups green
                        vars.groupColor = '#EE9A49';
                    } else if (_cp_ > _bp_) {
                        // tăng
                        if (_cp_ === _clp_) {
                            vars.groupColor = '#CC33CC';
                        } else {
                            vars.groupColor = '#00BB00';
                        }
                    } else if (_cp_ < _bp_) {
                        if (_cp_ > _fp_) {
                            vars.groupColor = '#CC0000';
                        } else if (_cp_ === _fp_) {
                            vars.groupColor = '#0077b5';
                        }
                    }
                }
            },
            onGroupMouseWheel: tooltip.hide,
            onGroupExposureChanging: tooltip.hide,
            onGroupOpenOrCloseChanging: tooltip.hide,
            onGroupHover: function (event) {
                tooltip.group(event.group);
            }
        });
    }

    //Process data
    const processData = (chartID, select) => {
        var groups = [];

        switch (chartID) {
            case 'nganh':
                const dsNganh = [...new Set(chartData.map((val) => select == 'all' ? val._in_ : select))];
                dsNganh.forEach((label) => {
                    var obj = { label: label, weight: 0, groups: [] };
                    var dataOfNganh = chartData.filter((data) => data._in_ === label);

                    dataOfNganh.forEach((element) => {
                        obj.weight += element._vhtt_;
                        obj.groups.push({
                            label: element._sc_,
                            weight: element._vhtt_,
                            _bp_: element._bp_,
                            _clp_: element._clp_,
                            _fp_: element._fp_,
                            _op_: element._op_,
                            _cp_: element._cp_,
                            _lp_: element._lp_,
                            change: element.change,
                            _pc_: element._pc_,
                            _tvol_: element._tvol_,
                            _tval_: element._tval_,
                            _in_: element._in_,
                            _sin_: element._sin_,
                            catID: element.catID,
                            stockName: element.stockName
                        });
                    });
                    groups.push(obj);
                });
                break;
            case 'san':
                const dsSan = [...new Set(chartData.map((val) => select == 'all' ? val.catID : select == 'HOSE'? 1 : select == 'HNX'?2: 3))];
                dsSan.forEach((label) => {
                    var obj = { label: label == 1 ? 'HOSE' : label == 2 ? 'HNX' : 'UPCOM', weight: 0, groups: [] };
                    var dataOfFloor = chartData.filter((data) => data.catID === label);

                    dataOfFloor.forEach((element) => {
                        obj.weight += element._vhtt_;
                        obj.groups.push({
                            label: element._sc_,
                            weight: element._vhtt_,
                            _bp_: element._bp_,
                            _clp_: element._clp_,
                            _fp_: element._fp_,
                            _op_: element._op_,
                            _cp_: element._cp_,
                            _lp_: element._lp_,
                            change: element.change,
                            _pc_: element._pc_,
                            _tvol_: element._tvol_,
                            _tval_: element._tval_,
                            _in_: element._in_,
                            _sin_: element._sin_,
                            catID: element.catID,
                            stockName: element.stockName
                        });
                    });
                    groups.push(obj);
                });
                break;
            case 'vhtt':
                const dsZiseVHTT = ['LagreCap', 'MidCap', 'Lowcap'];

                dsZiseVHTT.forEach((label) => {
                    var obj = { label: label, weight: 0, groups: [] };
                    var dataOfSize = chartData.filter((data) => data._in_ === label);

                    dataOfSize.forEach((element) => {
                        obj.weight += element._vhtt_;
                        obj.groups.push({
                            label: element._sc_,
                            weight: element._vhtt_,
                            _bp_: element._bp_,
                            _clp_: element._clp_,
                            _fp_: element._fp_,
                            _op_: element._op_,
                            _cp_: element._cp_,
                            _lp_: element._lp_,
                            change: element.change,
                            _pc_: element._pc_,
                            _tvol_: element._tvol_,
                            _tval_: element._tval_,
                            _in_: element._in_,
                            _sin_: element._sin_,
                            catID: element.catID,
                            stockName: element.stockName
                        });
                    });
                    groups.push(obj);
                });
                break;

            default:
                const dsDefault = [...new Set(chartData.map((val) => val._in_))];

                dsDefault.forEach((label) => {
                    var obj = { label: label, weight: 0, groups: [] };
                    var dataOfDefault = chartData.filter((data) => data._in_ === label);

                    dataOfDefault.forEach((element) => {
                        obj.weight += element._vhtt_;
                        obj.groups.push({
                            label: element._sc_,
                            weight: element._vhtt_
                        });
                    });
                    groups.push(obj);
                });
                break;
        }
        return groups;
    };

    return (
        <React.Fragment>
            <Grid container direction="row">
                <Grid  item xs={10} style={{ height: 400 }} id={chartID}></Grid>
                <Grid item xs={2}>
                        <FormControl variant='standard' sx={{ m: 1, minWidth: 120, maxWidth:'100%' }} size="small">
                            <InputLabel id="demo-simple-select-label">Chọn {chartID == 'nganh' ? 'Ngành' : 'Sàn'}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={select}
                                label="Search"
                                onChange={handleChangeSelect}
                            >
                                <MenuItem value="all">
                                    Tất cả
                                </MenuItem>
                                {lstSelect?.map(item => (<MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>))}
                            </Select>
                        </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
export default MultilevelTreeMap;
