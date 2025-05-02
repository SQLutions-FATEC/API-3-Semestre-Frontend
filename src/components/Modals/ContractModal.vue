<script>
import { Modal, message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import company from '@/services/company';
import RoleModal from '@/components/Modals/RoleModal.vue';
import role from '@/services/role';

export default {
  name: 'ContractModal',

  props: {
    open: {
      required: true,
      type: Boolean,
    },
  },

  components: {
    'a-modal': Modal,
    'role-modal': RoleModal,
  },

  setup(props, { emit }) {
    const dateFormatList = 'DD/MM/YYYY HH:mm';

    const companyOptions = ref([]);
    const isRoleModalOpened = ref(false);
    const roleOptions = ref([]);
    const selectedCompanyData = ref({});
    const selectedCompanyId = ref('');
    const selectedDatetime = ref([]);
    const selectedRoleData = ref({});
    const selectedRoleId = ref('');

    const addContract = async () => {
      if (
        !(
          selectedCompanyData.value && Object.keys(selectedCompanyData.value)
        ) ||
        !(selectedRoleData.value && Object.keys(selectedRoleData.value)) ||
        !selectedDatetime.value.length
      ) {
        return message.error(
          'Empresa, função e datas de contrato devem estar preenchidos'
        );
      }

      const contract = {
        company: {
          id: selectedCompanyData.value.id,
          name: selectedCompanyData.value.name,
        },
        role: {
          id: selectedRoleData.value.id,
          name: selectedRoleData.value.name,
        },
        datetime_start: selectedDatetime.value[0],
        datetime_end: selectedDatetime.value[1],
      };

      await contract.create(contract);
      emit('fetch-contracts');

      selectedCompanyId.value = '';
      selectedCompanyData.value = {};
      selectedRoleId.value = '';
      selectedRoleData.value = {};
      selectedDatetime.value = [];

      closeModal();
    };

    const closeModal = () => {
      emit('update:open', false);
    };

    const ensureAddNewIsLast = () => {
      const regularOptions = roleOptions.value.filter(
        (opt) => opt.value !== 'add-new'
      );

      roleOptions.value = [
        ...regularOptions,
        { value: 'add-new', label: '➕ Adicionar Função' },
      ];
    };

    const fetchCompanies = async () => {
      try {
        const response = await company.get();
        companyOptions.value = response.data.map((item) => ({
          label: item.name,
          value: item.id,
          data: item,
          key: item.id,
        }));
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await role.get();
        roleOptions.value = response.data.map((item) => ({
          label: item.name,
          value: item.id,
          data: item,
          key: item.id,
        }));

        ensureAddNewIsLast();
      } catch (error) {
        console.error('Erro ao buscar funções:', error);
      }
    };

    const handleCompanyChange = (value, selectedOptions) => {
      if (value && selectedOptions.length) {
        selectedCompanyId.value = value;
        selectedCompanyData.value = selectedOptions[0].data;
      }
    };

    const handleRoleChange = (value, selectedOptions) => {
      if (value && selectedOptions.length) {
        if (value.includes('add-new')) {
          openRoleModal();
          ensureAddNewIsLast();
        } else {
          selectedRoleId.value = value;
          selectedRoleData.value = selectedOptions[0].data;
        }
      }
    };

    const openRoleModal = () => {
      isRoleModalOpened.value = true;
    };

    onMounted(async () => {
      await Promise.all([fetchCompanies(), fetchRoles()]);
    });

    return {
      addContract,
      closeModal,
      companyOptions,
      dateFormatList,
      fetchRoles,
      handleCompanyChange,
      handleRoleChange,
      isRoleModalOpened,
      props,
      roleOptions,
      selectedCompanyData,
      selectedCompanyId,
      selectedDatetime,
      selectedRoleData,
      selectedRoleId,
    };
  },
};
</script>

<template>
  <a-modal
    title="Novo Contrato"
    :open="open"
    @cancel="closeModal"
    @ok="addContract"
  >
    <div class="contract-modal">
      <a-cascader
        v-model:value="selectedCompanyId"
        placeholder="Empresa"
        style="width: 100%"
        :options="companyOptions"
        :showSearch="{
          filter: (inputValue, path) =>
            path.some((option) =>
              option.label.toLowerCase().includes(inputValue.toLowerCase())
            ),
        }"
        @change="handleCompanyChange"
      />
      <a-cascader
        v-model:value="selectedRoleId"
        placeholder="Função"
        style="width: 100%"
        :options="roleOptions"
        :showSearch="{
          filter: (inputValue, path) =>
            path.some((option) => {
              if (option.value === 'add-new') return false;
              return option.label
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }),
        }"
        @change="handleRoleChange"
      />
      <a-range-picker
        v-model:value="selectedDatetime"
        style="width: 100%"
        show-time
        :format="dateFormatList"
        :placeholder="['Data início', 'Data fim']"
        :time-picker-props="{ format: 'HH:mm' }"
      />
    </div>
    <role-modal v-model:open="isRoleModalOpened" @fetch-roles="fetchRoles" />
  </a-modal>
</template>

<style lang="scss" scoped>
.contract-modal {
  padding: $spacingXl 0px;
  display: flex;
  flex-direction: column;
  gap: $spacingXl;
}
</style>
