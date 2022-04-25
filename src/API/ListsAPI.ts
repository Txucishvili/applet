import { UsersLocalDataAPI } from '@/API/UsersAPI';
import { cloneDeep } from 'lodash';
import { HTTPSuccess, HTTPSuccessType } from './index';

// local 

export class ListsAPI {
  list: any;

  constructor() {
    if (!localStorage.getItem('_localList')) {
      this._initFetch();
    }
    const localWidgets: any = localStorage.getItem('_localList');

    this.list = cloneDeep(JSON.parse(localWidgets));
  }

  async _initFetch() {
    const response: any = await fetch('https://jsonplaceholder.typicode.com/todos').then(r => r.json());
    if(!!response) {
      console.log("----")
      this.list = cloneDeep(response);
      localStorage.setItem('_localList', JSON.stringify(response))
    }
  }

  async fetchAll() {
    if (!this.list.length) {
      await this._initFetch();
    }
    return new Promise((resolve) => {
      resolve(this.list);
    })
  }

}

export const ListAPI = new ListsAPI();