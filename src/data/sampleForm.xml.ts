
/**
 * Sample XML Form Definitions
 * 
 * This file contains predefined XML form templates that can be loaded
 * in the application. Each template demonstrates different form field types
 * and configurations.
 */

export const EQUIPMENT_INSPECTION_FORM = `
<form id="equipment-inspection" title="Equipment Inspection Form" description="Complete this form to document equipment inspection">
  <field id="inspector_name" type="text" label="Inspector Name" required="true" placeholder="Enter your full name" />
  <field id="inspection_date" type="date" label="Inspection Date" required="true" />
  <field id="equipment_id" type="text" label="Equipment ID" required="true" placeholder="Enter equipment ID or serial number" />
  <field id="equipment_status" type="radio" label="Equipment Status" required="true">
    <option>Operational</option>
    <option>Needs Maintenance</option>
    <option>Out of Service</option>
  </field>
  <field id="notes" type="text" label="Notes" placeholder="Enter any additional notes or observations" />
  <field id="inspector_signature" type="drawing" label="Inspector Signature" required="true" hint="Please sign to verify inspection" />
</form>
`;

export const INCIDENT_REPORT_FORM = `
<form id="incident-report" title="Incident Report" description="Use this form to report workplace incidents">
  <field id="reporter_name" type="text" label="Your Name" required="true" placeholder="Enter your full name" />
  <field id="incident_date" type="date" label="Date of Incident" required="true" />
  <field id="location" type="text" label="Location" required="true" placeholder="Where did the incident occur?" />
  <field id="incident_type" type="radio" label="Type of Incident" required="true">
    <option>Injury</option>
    <option>Near Miss</option>
    <option>Property Damage</option>
    <option>Environmental</option>
    <option>Other</option>
  </field>
  <field id="description" type="text" label="Description" required="true" placeholder="Describe what happened" />
  <field id="reporter_signature" type="drawing" label="Signature" required="true" hint="Sign to confirm this report" />
</form>
`;

export const VEHICLE_INSPECTION_FORM = `
<form id="vehicle-inspection" title="Vehicle Inspection Checklist" description="Complete before operating company vehicles">
  <field id="driver_name" type="text" label="Driver Name" required="true" placeholder="Enter your name" />
  <field id="inspection_date" type="date" label="Date" required="true" />
  <field id="vehicle_id" type="text" label="Vehicle ID/License" required="true" placeholder="Enter vehicle identification" />
  <field id="odometer" type="text" label="Odometer Reading" placeholder="Current mileage" />
  <field id="exterior_condition" type="radio" label="Exterior Condition" required="true">
    <option>Excellent</option>
    <option>Good</option>
    <option>Fair</option>
    <option>Poor</option>
  </field>
  <field id="tire_condition" type="radio" label="Tire Condition" required="true">
    <option>Good</option>
    <option>Needs Attention</option>
    <option>Requires Immediate Service</option>
  </field>
  <field id="notes" type="text" label="Additional Notes" placeholder="Note any issues or concerns" />
  <field id="driver_signature" type="drawing" label="Driver Signature" required="true" hint="Sign to verify inspection" />
</form>
`;

// Export an array of all sample forms for easy access
export const SAMPLE_FORMS = [
  { 
    id: "equipment-inspection", 
    name: "Equipment Inspection Form", 
    xml: EQUIPMENT_INSPECTION_FORM 
  },
  { 
    id: "incident-report", 
    name: "Incident Report", 
    xml: INCIDENT_REPORT_FORM 
  },
  { 
    id: "vehicle-inspection", 
    name: "Vehicle Inspection Checklist", 
    xml: VEHICLE_INSPECTION_FORM 
  }
];

// Default/placeholder XML for new forms
export const EMPTY_FORM_TEMPLATE = `
<form id="new-form" title="New Form" description="Enter form description here">
  <field id="field1" type="text" label="Text Field" placeholder="Enter text here" />
  <field id="field2" type="date" label="Date Field" />
  <field id="field3" type="radio" label="Radio Options">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </field>
  <field id="field4" type="drawing" label="Signature" hint="Draw your signature here" />
</form>
`;
