<script>
import RoleModal from '@/components/Modals/RoleModal.vue';
import company from '@/services/company';
import role from '@/services/role';
import { Cascader, DatePicker, message, Modal } from 'ant-design-vue';
import dayjs from 'dayjs';
import { ref, watch } from 'vue';

export default {
  name: 'ContractModal',

  props: {
    contract: {
      default: {},
      type: Object,
    },
    open: {
      required: true,
      type: Boolean,
    },
  },

  components: {
    'a-cascader': Cascader,
    'a-modal': Modal,
    'a-range-picker': DatePicker.RangePicker,
    'role-modal': RoleModal,
  },

  setup(props, { emit }) {
    const dateFormatList = 'DD/MM/YYYY';

    const companyOptions = ref([]);
    const isEditing = ref(false);
    const isRoleModalOpened = ref(false);
    const roleOptions = ref([]);
    const selectedCompanyId = ref('');
    const selectedDatetime = ref([]);
    const selectedRoleId = ref('');

    const addContract = (newContract) => {
      newContract.action = 'create';
      emit('add-contract', newContract);
    };

    const addEditContract = async () => {
      if (
        !selectedCompanyId.value ||
        !selectedRoleId.value ||
        !selectedDatetime.value.length
      ) {
        return message.error(
          'Empresa, função e datas de contrato devem estar preenchidos'
        );
      }

      const selectedCompany = companyOptions.value.find(
        (company) => company.data.id == selectedCompanyId.value
      );
      const selectedRole = roleOptions.value.find(
        (role) => role.data.id == selectedRoleId.value
      );

      const contract = {
        company: {
          id: selectedCompany.data.id,
          label: selectedCompany.data.name,
        },
        role: { id: selectedRole.data.id, label: selectedRole.data.name },
        date_start: dayjs(selectedDatetime.value[0]).format('YYYY-MM-DD'),
        date_end: dayjs(selectedDatetime.value[1]).format('YYYY-MM-DD'),
      };

      if (isEditing.value) editContract(contract);
      else addContract(contract);

      selectedCompanyId.value = '';
      selectedRoleId.value = '';
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

    const editContract = (edittedContract) => {
      edittedContract.action = 'update';
      emit('edit-contract', edittedContract);
    };

    const fetchCompanies = async () => {
      try {
        const { data } = await company.get();
        companyOptions.value = data.items.map((item) => ({
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
      }
    };

    const handleRoleChange = (value, selectedOptions) => {
      if (value && selectedOptions.length) {
        if (value.includes('add-new')) {
          openRoleModal();
          ensureAddNewIsLast();
        } else {
          selectedRoleId.value = value;
        }
      }
    };

    const openRoleModal = () => {
      isRoleModalOpened.value = true;
    };

    const loadData = async () => {
      await Promise.all([fetchCompanies(), fetchRoles()]);

      if (isEditing.value) {
        selectedCompanyId.value = props.contract.company.id;
        selectedRoleId.value = props.contract.role.id;
        selectedDatetime.value = [
          dayjs(props.contract.date_start),
          dayjs(props.contract.date_end),
        ];
      }
    };

    watch(
      () => props.open,
      async (isOpen) => {
        if (isOpen) {
          isEditing.value = !!Object.keys(props.contract).length;
          await loadData();
        }
      },
      { immediate: true }
    );

    return {
      addEditContract,
      closeModal,
      companyOptions,
      dateFormatList,
      fetchRoles,
      handleCompanyChange,
      handleRoleChange,
      isRoleModalOpened,
      roleOptions,
      selectedCompanyId,
      selectedDatetime,
      selectedRoleId,
    };
  },
};
</script>

<template>
  <a-modal
    title="Novo Contrato"
    :open="open"
    cancelText="Cancelar"
    okText="Salvar"
    @cancel="closeModal"
    @ok="addEditContract"
  >
    <div class="contract-modal">
      <div class="input-group">
        <label>Empresa</label>
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
      </div>
      <div class="input-group">
        <label>Função</label>
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
      </div>
      <div class="input-group">
        <label>Datas</label>
        <a-range-picker
          v-model:value="selectedDatetime"
          style="width: 100%"
          :format="dateFormatList"
          :placeholder="['Data início', 'Data fim']"
        />
      </div>
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

  .input-group {
    display: flex;
    flex-direction: column;
    gap: $spacingXs;
    margin-bottom: 0;
    width: 100%;
  }
}
</style>
