import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceTsService {

  constructor(private http:HttpClient) { }

  getInvoiceNo():string
  {
    return "INV-"+Math.floor(Math.random()*1000)
  }
  getLanguages()
  {
    return this.http.get('../../assets/invoice.json').pipe
    (
      map((n:any)=>n.languages),
    )
  }
  getCurrency()
  {
    return this.http.get('../../assets/invoice.json').pipe
    (
      map((n:any)=>n.Currency),
    )
  }
  getAddress()
  {
    return this.http.get('../../assets/invoice.json').pipe
    (
      map((n:any)=>n.Address),
    )
  }
  getInvoice()
  {
    return this.http.get('../../assets/invoice.json').pipe
    (
      map((n:any)=>n.InvoiceDue),
    )
  }
  getPurchaseOrder()
  {
    return "PO-"+Math.floor(Math.random()*1000)
  }
  
  
}
