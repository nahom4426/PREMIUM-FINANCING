<script setup>
import Button from "@/components/Button.vue";
import Form from "@/components/new_form_builder/Form.vue";
import { Input } from "@/components/new_form_elements";
</script>
<template>
  <Form v-slot="{ submit }" id="fee-form" class="grid grid-cols-3 gap-4">
    <Input
      label="Contribution Amount"
      name="contributionAmount"
      validation="required"
      :attributes="{
        placeholder: 'Enter Contribution Amount',
      }"
    />
    <Input
      name="receiptNo"
      label="Receipt No"
      validation="required|num"
      :attributes="{
        placeholder: 'Enter Receipt No',
      }"
    />
    <Input
      name="additionalBeneficiaryFee"
      label="Additional Beneficiary Fee"
      validation="required|num"
      :attributes="{
        placeholder: 'Enter Additional Beneficiary Fee',
      }"
    />
		<div class="col-span-3 grid gap-4 grid-cols-4">
			<Input
				name="penaltyFee"
				label="Penalty Fee"
				validation="num"
				:attributes="{
					placeholder: 'Enter Penalty Fee',
				}"
			/>
			<Input
				name="cardReplacementFee"
				label="Card Replacement Fee"
				validation="required|num"
				:attributes="{
					placeholder: 'Enter Card Replacement Fee',
				}"
			/>
			<Input
				name="otherFees"
				label="Other Fees"
				validation="num"
				:attributes="{
					placeholder: 'Enter Other Fees',
				}"
			/>
			<Input
				name="registrationFee"
				label="Registration Fee"
				validation="required|num"
				:attributes="{
					placeholder: 'Enter Registration Fee',
				}"
			/>
		</div>
		<div class="col-span-3 flex justify-end border-t p-2">
			<Button @click.prevent="submit(console.log)" class="bg-dark text-white">
				Add Dependant
			</Button>
		</div>
  </Form>
</template>
