import {AppModal} from '@/ui/Shared';
import React, { memo, useCallback, useEffect, useState } from 'react';
import '@sass/components/widget-modal/_widget-modal.scss';
import Button from '@/ui/Shared/Button/Button';
import { WidgetsModule, WidgetsStore } from '@/services/WidgetService';
import { cloneDeep } from 'lodash';
import { LocalWidgets, WidgetsAPI } from '@/API/WidgetsAPI';
import { WidgetIcons } from '@/API/WidgetsList';
import { SharedIconList } from '@/ui/Icon';

interface IWidgetModal {
  list: any[];
  onInstallClick: Function
}


const WidgetListItem = (props) => {
  const { item } = props;
  const [installing, setInstall] = useState(false);

  const installWidget = useCallback(
    () => {
      if (installing) {
        return;
      }

      const installCallback = (status) => {
        setInstall(false);
      }

      setInstall(true);
      props.onInstallClick(item, installCallback);
    },
    [installing],
  )

  return <div className='widget-list widget-list--item'>
    <div className="item--image" key={item.id}>
      {WidgetIcons[item.name]}
      {/* <img src={item.avatar} alt="" /> */}
    </div>
    <div className="item--body">
      <div onClick={() => {
        // console.log('e', item)
      }} className="item--title">
        {item.name}
      </div>
      <div className="item--desc">
        {item.desc}
        {/* <p>{installing.toString()}</p> */}
      </div>
    </div>
    <div className="item--action">
      <Button
        onClick={installWidget}
        _type={installing ? 'outline' : item.installed ? 'outline' : 'simple'}
        variant={installing ? 'info' : item.installed ? 'danger' : 'success'}
        color='green'
        text={installing ? 'installing...' : item.installed ? 'uninstall' : 'install'} />
    </div>
  </div>
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const WidgetModal = (props: IWidgetModal) => {
  return <div className="widget-modal widget-modal--wrap">
    <div className="widget-modal--head">
      <div className="container-fluid">
        <div className="row">
          <div className="search-area">
            <input type="text" placeholder='explore widgets' />
          </div>
        </div>
      </div>
    </div>
    <div className="widget-modal--body">
      <div className="container-fluid">
        <div className="widget-list">
          <div className="row">
            {!props.list.length ? 'loading...' : null}
            {props.list.map((widget, key) => {
              return <div key={widget.id} className='col-md-6 item'>
                <WidgetListItem onInstallClick={(e, cb) => props.onInstallClick(key, cb)} item={widget} />
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export function _WidgetsSide() {
  const [modal, setModal] = useState(false)
  const [widgetsList, setwidgetsList]: any = useState([]);

  // console.log('------------')

  useEffect(() => {
    WidgetsAPI.getAll().then((r) => {
      if (r.status) {
        setwidgetsList(r.data);
      }
    })

    return () => {
    }
  }, [])

  const onInstallClick = useCallback(async (e, cb) => {
    let installResp;

    if (!widgetsList[e].installed) {
      await sleep(300);
      installResp = await WidgetsAPI.installWidget(widgetsList[e].id);
      if (installResp.status) {
        // console.log("[installed resp]", installResp)
        await WidgetsModule.setWidgets(widgetsList[e].key);
      }

    } else {
      await sleep(300);
      installResp = await WidgetsAPI.removeWidget(widgetsList[e].id);
      if (installResp.status) {
        await WidgetsModule.removeWidgets(widgetsList[e].key);
      }
    }

    if (installResp.status) {
      // const _newList = [...widgetsList];
      // let item = { ..._newList[e] };
      // item = installResp.data;
      // _newList[e] = item;
      // setwidgetsList(_newList);


      // widgetsList[e] = installResp.data;
      widgetsList[e].installed = !widgetsList[e].installed
      
      cb(e);
    }

  }, [widgetsList])

  return (
    <div>
      <div className="side-nav--switcher">
        <div onClick={() => setModal(true)} className="side-nav--switcher--item">
          {SharedIconList.checkpoints}
        </div>
      </div>
      <AppModal
        keyboard={true}
        onHide={() => setModal(false)}
        show={modal}
      >
        <WidgetModal
          list={widgetsList}
          onInstallClick={onInstallClick}
        />
      </AppModal>
    </div>
  )
}
const WidgetsSide = memo(_WidgetsSide, () => true)
export default WidgetsSide;