import {Component, Input, Output} from '@angular/core';

@Component({
  selector:'objective-component',
  template:`
      <div class="panel-group" id="accordion">
      <div class="panel panel-info" *ngFor="let obj of objective; let i = index;">
        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" [attr.data-target]="'#obj' + i">
          <b>{{i+1}}) Objective :</b> {{obj.objective}}
        </div>

        <div class="panel-collapse collapse" [attr.id]="'obj' + i" [ngClass]="{'in': i == 0}">
          <div class="panel-body">
            <p *ngIf="!obj.initiatives.length">No Initiative added yet for this Objective.</p>
            <div class="panel-group" id="accordion2">
              <div class="panel panel-default" *ngFor="let ini of obj.initiatives; let j = index;">
                <div class="panel-heading" data-toggle="collapse" data-parent="#accordion2" [attr.data-target]="'#obj' + i + 'ini' + j"><b>{{i+1}}.{{j+1}}) Initiative :</b> {{ini.initiative}}
                </div>
                <div class="panel-collapse collapse" [attr.id]="'obj' + i + 'ini' + j" [ngClass]="{'in': j == 0}">
                  <div class="panel-body">
                    <p *ngIf="!ini.activities">No Activity added yet for this Initiative</p>
                    <div class="panel-group" id="accordion3">
                      <div class="panel panel-default" *ngFor="let act of ini.activities; let k = index;">
                        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion3" [attr.data-target]="'#obj' + i + 'ini' + j + 'act' + k">
                          <b>{{i+1}}.{{j+1}}.{{k+1}}) Activity :</b> {{act.activity}}
                        </div>
                        <div class="panel-collapse collapse" [attr.id]="'obj' + i + 'ini' + j + 'act' + k" [ngClass]="{'in': k == 0}">
                          <div class="panel-body">
                            <p *ngIf="!act.activityMeasures">No Measure set yet for this Activities</p>
                            <div class="panel-group" id="accordion4">
                              <div class="panel panel-default" *ngFor="let measr of act.activityMeasures;let l = index;">
                                <div class="panel-heading row" style="margin:0px !important;">
                                  <div class="col-sm-6 col xs-6" style="padding:0px !important;" data-toggle="collapse" data-parent="#accordion4" [attr.data-target]="'#obj' + i + 'ini' + j + 'act' + k + 'measr' + l">
                                    <b>{{i+1}}.{{j+1}}.{{k+1}}.{{l+1}}) Measure:</b> {{measr.measure}}
                                  </div>
                                  <div class="col-sm-6 col xs-6 text-center">
                                    <span class="label label-primary ">Estimated Cost <span class="">84000</span></span>
                                    <span class="label label-info ">2017 <span class="">Q1</span></span>
                                    <span class="label label-primary "><span class="">@</span> Inprogress</span>
                                    <span class="label label-info ">Target <span class="">84</span></span>
                                  </div>
                                </div>
                                <div class="panel-collapse collapse" [attr.id]="'obj' + i + 'ini' + j + 'act' + k + 'measr' + l" [ngClass]="{'in': l == 0}">
                                  <div class="panel-body">
                                    <label>Current Level:</label> {{measr.currentLevel}}
                                    <span class="glyphicon glyphicon-time pull-right"><label> {{measr.frequency}}</label></span>
                                    <div class="panel panel-default">
                                      <div class="panel-heading text-center"><b>Estimated Target</b></div>
                                      <div class="panel-body">
                                        <div class="panel-group" id="accordionTable">
                                          
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
})
export class Objective{
  @Input('objective') public objective:any[]; 
  constructor(){

  }
}