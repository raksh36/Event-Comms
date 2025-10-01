import { LightningElement, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    searchOptions = [
        { label: 'All Types', value: '' }
    ];
    error;

    @wire(getBoatTypes)
    boatTypes({ data, error }) {
        if (data) {
            const options = [{ label: 'All Types', value: '' }];
            data.forEach((typeRecord) => {
                options.push({ label: typeRecord.Name, value: typeRecord.Id });
            });
            this.searchOptions = options;
            this.error = undefined;
        } else if (error) {
            this.searchOptions = [{ label: 'All Types', value: '' }];
            this.error = error;
            // Optionally surface error via toast; not required by spec
        }
    }

    handleSearchOptionChange(event) {
        this.selectedBoatTypeId = event.detail.value;
        this.dispatchEvent(
            new CustomEvent('search', {
                detail: { boatTypeId: this.selectedBoatTypeId },
                bubbles: true,
                composed: true
            })
        );
    }
}