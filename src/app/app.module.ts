import { NgModule } from '@angular/core';

import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';

import { AdminComponent } from './admin/admin.component';
import { StaffComponent } from './staff/staff.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoWebComponent } from './logo-web/logo-web.component';
// import { Interceptor } from './Interceptor';
import { TesttemComponent } from './testtem/testtem.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountManagerComponent } from './admin/account-manager/account-manager.component';
import { ApiService } from './api.service';
import { CreateAccountComponent } from './admin/create-account/create-account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponentComponent } from './admin/create-account/success-dialog-component/success-dialog-component.component';
import { QamComponent } from './qam/qam.component';
import { SwitcherWrapperComponent } from './switcher-wrapper/switcher-wrapper.component';

import { MostPopularIdeaComponent } from './qam/most-popular-idea/most-popular-idea.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';

import { EventListComponent } from './admin/event-list/event-list.component';
import { EventAndDeadLineComponent } from './admin/event-and-deadline/event-and-deadline.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentsComponent } from './comments/comments.component';
import { CommentsListComponent } from './comments/comments-list/comments-list.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardComponent } from './qam/dash-board/dash-board.component';


import { QacComponent } from './qac/qac.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { EventDetailComponent } from './qam/event-detail/event-detail.component';
import { DocumentDownloadComponent } from './qam/document-download/document-download.component';

import { CategorymanagerComponent } from './qam/category-manager/category-manager.component';
import { StaffHomePageComponent } from './staff/staff-home-page/staff-home-page.component';
import { ListIdeaOfEventComponent } from './staff/list-idea-of-event/list-idea-of-event.component';
import { EachIdeaComponent } from './staff/each-idea/each-idea.component';
import { EachEventComponent } from './staff/each-event/each-event.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { DepartmentManagerComponent } from './admin/department-manager/department-manager.component';
import { ImageViewerModule } from 'ngx-image-viewer';
import { InputCommentComponent } from './staff/input-comment/input-comment.component';
import { ListCommentComponent } from './staff/list-comment/list-comment.component';
import { NewIdeaComponent } from './staff/each-event/new-idea/new-idea.component';


// Import PrimeNG modules
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
// import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
// import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { GMapModule } from 'primeng/gmap';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LikeDislikeComponent } from './staff/each-idea/like-dislike/like-dislike.component';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { TopPopularIdeasComponent } from './top-popular-ideas/top-popular-ideas.component';
import { QacHomepageComponent } from './qac/qac-homepage/qac-homepage.component';
import { EditIdeaComponent } from './staff/each-event/edit-idea/edit-idea.component';

import { ChartModule } from 'angular-highcharts'
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    CreateAccountComponent,
    HeaderComponent,
    FooterComponent,
    LogoWebComponent,
    TesttemComponent,
    ResetPasswordComponent,
    AccountManagerComponent,
    QamComponent,
    SwitcherWrapperComponent,
    EventListComponent,
    EventAndDeadLineComponent,
    MostPopularIdeaComponent,
    CategorymanagerComponent,
    SwitcherWrapperComponent,
    SnackBarComponent,
    CommentsComponent,
    CommentsListComponent,
    DocumentDownloadComponent,
    DashBoardComponent,
    QacComponent,

    EventDetailComponent ,
    StaffComponent,
    StaffHomePageComponent,
    ListIdeaOfEventComponent,
    EachIdeaComponent,
    EachEventComponent,
    DepartmentManagerComponent,
    DialogComponentComponent,
    InputCommentComponent,
    ListCommentComponent,
    ProfileUserComponent,
    NewIdeaComponent,
    LikeDislikeComponent,
    AdminHomepageComponent,
    TopPopularIdeasComponent,
    QacHomepageComponent,
    EditIdeaComponent



  ],
  imports: [
    ChartModule,
    HighchartsChartModule,
    AvatarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbModule,
    BlockUIModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CascadeSelectModule,
    // ChartModule,
    CheckboxModule,
    ChipsModule,
    ChipModule,
    // CodeHighlighterModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    VirtualScrollerModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DockModule,
    DragDropModule,
    DropdownModule,
    DynamicDialogModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    GMapModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ImageModule,
    KnobModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    MultiSelectModule,
    OrganizationChartModule,
    OrderListModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
    SidebarModule,
    ScrollerModule,
    ScrollPanelModule,
    ScrollTopModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SpeedDialModule,
    SpinnerModule,
    SplitterModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TriStateCheckboxModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    AnimateModule,
    CardModule,




    BrowserModule, HttpClientModule, FormsModule, SweetAlert2Module.forRoot(),
    AppRoutingModule, ReactiveFormsModule, MatDialogModule, ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), NgToastModule, MatPaginatorModule, NgxPaginationModule, MatSnackBarModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, NgbModule, BrowserAnimationsModule, ImageViewerModule.forRoot()
  ],
  providers: [
    ApiService,
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponentComponent, EachIdeaComponent]
})

export class AppModule { }
