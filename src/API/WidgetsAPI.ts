import { UsersLocalDataAPI } from '@/API/UsersAPI';
import { cloneDeep } from 'lodash';
import { HTTPSuccess, HTTPSuccessType } from './index';

// local 

export class LocalWidgets {
  widgetsList: any;

  constructor() {
    const _widgetList = Array(17).fill(null).map((w, key) => {
      return {
        id: `Widget${key}`,
        name: `Widget ${key}`,
        desc: 'desc of widgett',
        installed: false
      }
    });

    if (!localStorage.getItem('widgets')) {
      localStorage.setItem("widgets", JSON.stringify(_widgetList))
    }
    const localWidgets: any = localStorage.getItem('widgets');

    this.widgetsList = cloneDeep(JSON.parse(localWidgets));
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
    console.log("this.widgetsList installWidget", widgetItem)


    // Comunication API
    // UsersLocalDataAPI.updateUserInfo('any', {
    //   widgets: [].concat(UsersLocalDataAPI.currentUser.widgets, id)
    // })

    // s//////

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
    console.log("this.widgetsList installWidget", widgetItem)


    return new Promise((r) => {
      r(new HTTPSuccess({
        data: cloneDeep(widgetItem)
      }))
    })
  }

}

export const WidgetsAPI = new LocalWidgets();