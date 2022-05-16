import { UsersLocalDataAPI } from '@/API/UsersAPI';
import { cloneDeep, isEqual } from 'lodash';
import { HTTPSuccess, HTTPSuccessType } from './index';
import { InitialWidgetList } from './WidgetsList';

interface IWidget {
  id: string | number;
  name: string;
  desc: string;
  avatar: string | any;
}

// local 


export class LocalWidgets {
  widgetsList: any;

  constructor() {
    const _widgetList = InitialWidgetList.map((w, key) => {
      return {
        ...w,
        installed: false
      }
    });

    
    if (!localStorage.getItem('widgets')) {
      localStorage.setItem("widgets", JSON.stringify(_widgetList))
    } 


    const _localWidgets: any = localStorage.getItem('widgets');
    const localWidgets: any = JSON.parse(_localWidgets);

    // this.widgetsList = cloneDeep(_widgetList);
    this.widgetsList = cloneDeep(localWidgets);
  }

  _setItems(list) {
    new Promise((r: any) => {
      this.widgetsList = [...list];
      localStorage.setItem('widgets', JSON.stringify(list));
      r()
    })
  }
  _updateState(list) {
    new Promise((r: any) => {
      this.widgetsList = [...list];
      localStorage.setItem('widgets', JSON.stringify(list));
      r()
    })
  }


  // 

  getAll(): Promise<HTTPSuccessType> {
    return new Promise((r) => {
      setTimeout(() => {
        r(new HTTPSuccess({
          data: cloneDeep(this.widgetsList)
        }))
      }, 700);
    });
  }

  async installWidget(id): Promise<HTTPSuccessType> {
    const localWidgets:  any = Object.assign([], [...this.widgetsList]);
    const widgetItem = localWidgets.find((w) => w.id == id);

    Object.assign(widgetItem, {
      installed: true
    });

    this._updateState(this.widgetsList);

    return new Promise((r) => {
      r(new HTTPSuccess({
        data: cloneDeep(widgetItem)
      }))
    })
  }

  removeWidget(id): Promise<HTTPSuccessType> {
    const localWidgets:  any = Object.assign([], [...this.widgetsList]);
    const widgetItem = localWidgets.find((w) => w.id == id);

    Object.assign(widgetItem, {
      installed: false
    });

    this._updateState(this.widgetsList);


    return new Promise((r) => {
      r(new HTTPSuccess({
        data: cloneDeep(widgetItem)
      }))
    })
  }

}

export const WidgetsAPI = new LocalWidgets();