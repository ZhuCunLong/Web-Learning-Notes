import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getcallbackData(callback) {
    setTimeout(() => {
      const data = 'data-callback'
      callback(data)
    }, 1000)
  }

  getPromiseData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = 'data-Promise'
        resolve(data)
      }, 2000)
    })
  }

  getRxjsData() {
    return new Observable((observer) => {
      setTimeout(() => {
        const data = 'data-Rxjs'
        observer.next(data)
      }, 3000)
    })
  }

  getIntervalPromiseData() {
    return new Promise((resolve) => {
      setInterval(() => {
        const data = 'Intervaldata-Promise'
        resolve(data)
      }, 2000)
    })
  }

  getIntervalRxjsData() {
    let count = 0;
    return new Observable((observer) => {
      setInterval(() => {
        count++
        const data = 'Intervaldata-Rxjs' + count
        observer.next(data)
      }, 1000)
    })
  }

  getIntervalRxjsNum() {
    let count = 0;
    return new Observable((observer) => {
      setInterval(() => {
        count++
        observer.next(count)
      }, 1000)
    })
  }
}
