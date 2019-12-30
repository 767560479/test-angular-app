import { dfMessagesConst } from './../../constants/df-global.const';
import { Injectable } from '@angular/core';
import {
    NzNotificationService, NzMessageService, NzModalService, ModalOptionsForService,
    ConfirmType, NzMessageDataOptions, NzNotificationDataOptions
} from 'ng-zorro-antd';
import { isNullOrUndefined } from 'util';

/**
 *
 * 通用消息提示服务, 处理消息提示、弹出框
 * @createDate     2018.10.18
 * @lastUpdateDate 2018.10.18
 * @version        1.0
 * @description    ...
 */
@Injectable({
    providedIn: 'root'
  })
export class DfMessages {
    // private defaultOptions = {nzStyle: {}};
    constructor(private messageService: NzMessageService,
                private modalService: NzModalService,
                private notificationService: NzNotificationService) {
    }

    /**
     * @returns (NzMessageService) NZ消息服务对象
     */
    getMessageService(): NzMessageService {
        return this.messageService;
    }

    /**
     * @returns (NzModalService) NZ对话框服务对象
     */
    getModalService(): NzModalService {
        return this.modalService;
    }

    /**
     * @returns (NzNotificationService) NZ通知服务对象
     */
    getNotificationService(): NzNotificationService {
        return this.notificationService;
    }

    showInfoMessage(content: string, options?: NzMessageDataOptions): void {
        this.messageService.info(content, options);
    }

    showSuccessMessage(content: string, options?: NzMessageDataOptions): void {
        this.messageService.success(content, options);
    }

    showWarningMessage(content: string, options?: NzMessageDataOptions): void {
        this.messageService.warning(content, options);
    }

    showErrorMessage(content: string, options?: NzMessageDataOptions): void {
        this.messageService.error(content, options);
    }

    showLoadingMessage(content: string): string {
        return this.messageService.loading(content, { nzDuration: 0 }).messageId;
    }

    hideLoadingMessage(messageId: string): void {
        this.messageService.remove(messageId);
    }

    showBasicNotification(content: string, title?: string, options?: NzNotificationDataOptions): void {
        this.notificationService.blank(isNullOrUndefined(title) ?
            dfMessagesConst.defaultMessageTitle.basicTitle : title, content, options);
    }

    showInfoNotification(content: string, title?: string, options?: NzNotificationDataOptions): void {
        this.notificationService.info(isNullOrUndefined(title) ?
            dfMessagesConst.defaultMessageTitle.infoTitle : title, content, options);
    }

    showSuccessNotification(content: string, title?: string, options?: NzNotificationDataOptions): void {
        this.notificationService.success(isNullOrUndefined(title) ?
            dfMessagesConst.defaultMessageTitle.successTitle : title, content, options);
    }

    showWarningNotification(content: string, title?: string, options?: NzNotificationDataOptions): void {
        this.notificationService.warning(isNullOrUndefined(title) ?
            dfMessagesConst.defaultMessageTitle.warningTitle : title, content, options);
    }

    showErrorNotification(content: string, title?: string, options?: NzNotificationDataOptions): void {
        this.notificationService.error(isNullOrUndefined(title) ?
            dfMessagesConst.defaultMessageTitle.errorTitle : title, content, options);
    }

    showInfoModal(content: string, title?: string): void {
        this.modalService.info({
            nzTitle: isNullOrUndefined(title) ?
                dfMessagesConst.defaultMessageTitle.infoTitle : title, nzContent: content
        });
    }

    showInfoModalOptions(options?: ModalOptionsForService): void {
        this.modalService.info(options);
    }

    showSuccessModal(content: string, title?: string): void {
        this.modalService.success({
            nzTitle: isNullOrUndefined(title) ?
                dfMessagesConst.defaultMessageTitle.successTitle : title, nzContent: content
        });
    }

    showSuccessModalOptions(options?: ModalOptionsForService): void {
        this.modalService.info(options);
    }

    showWarningModal(content: string, title?: string): void {
        this.modalService.warning({
            nzTitle: isNullOrUndefined(title) ?
                dfMessagesConst.defaultMessageTitle.warningTitle : title, nzContent: content
        });
    }

    showErrorModal(content: string, title?: string): void {
        this.modalService.error({
            nzTitle: isNullOrUndefined(title) ?
                dfMessagesConst.defaultMessageTitle.errorTitle : title, nzContent: content
        });
    }

    showConfirmModal(options?: ModalOptionsForService, confirmType?: ConfirmType) {
        this.modalService.confirm(options, confirmType);
    }


}
