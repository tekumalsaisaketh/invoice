import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InvoiceTsService } from './invoice.service';
import { Address } from '../address';
import { Items } from '../items';

@Component({
  selector: 'xarv-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit,OnChanges {

  inVoiceNo:string="";
  languages:string[]=[];
  currency:string[]=[];
  address:Address|undefined;
  invoice:string[]=[];
  quantity:number[]=[];
  PO:string="";
  lines:number=0;
  items:Items[]=[{
    item:"",
    quantity:0,
    rate:0,
    amount:0
  }]
  total:number=0;
  tax:number=0;
  totalDue:number=0;
  toAddress:Address|undefined;

  
  constructor(private invoiceservice:InvoiceTsService) { }

  ngOnChanges(changes: SimpleChanges): void
  {

  }

  ngOnInit(): void 
  {
      this.inVoiceNo=this.invoiceservice.getInvoiceNo();
      console.log(this.inVoiceNo);
      this.invoiceservice.getLanguages().subscribe(
        {
          next:data=>this.languages=data,
          error:err=>console.log(err),
          complete:()=>console.log('Completed')
        });
      this.invoiceservice.getCurrency().subscribe(
        {
          next:data=>this.currency=data,
          error:err=>console.log(err),
          complete:()=>console.log('Completed')
        });
      this.invoiceservice.getAddress().subscribe(
        {
          next:data=>this.address=data,
          error:err=>console.log(err),
          complete:()=>console.log('Completed')
        })
      this.invoiceservice.getInvoice().subscribe(
        {
          next:data=>this.invoice=data,
          error:err=>console.log(err),
          complete:()=>console.log('Completed')
        })
      this.PO=this.invoiceservice.getPurchaseOrder();
      
      
  }
  onClick()
  {
    this.lines++;
    this.items.push({
      item:'',
      quantity:0,
      rate:0,
      amount:0
    })
    
  }
  do(i:number)
  {
    this.total=this.total-this.items[i].amount;
    this.items[i].amount=this.items[i].quantity*this.items[i].rate;
    this.total=this.total+this.items[i].amount;
    this.tax=0.2*this.total;
    this.totalDue=this.tax+this.total;
  }
  onDelete(i:number)
  {
      this.total=this.total-this.items[i].amount;
      this.tax=0.2*this.total;
      this.totalDue=this.tax+this.total;
      this.items.splice(i,1);
  }
  

}
