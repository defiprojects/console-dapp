import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AppState } from '../rootReducer'
import { getDelegatedAmount, fetchValidatorData, getJailedValidators, getStake, getTotalStakeAmount, getValidators, getMaxStake, getMinStake, getPendingValidators } from '@/lib/contractInteract'
import Validators from '@/validators/validators.json'
import { fetchNodeByAddress, fetchTokenPrice, fetchTotalSupply } from '@/lib/api'
import { Address } from 'viem'

export interface ValidatorType {
    address: Address
    stakeAmount: string
    fee: string
    delegatorsLength: string
    delegators: [Address, string][]
    selfStakeAmount?: string
    name?: string
    website?: string
    firstSeen?: string
    status?: string
    image?: string
    forDelegation?: boolean
    totalValidated?: number
    uptime?: number
    description?: string
    isPending?: boolean
}

export interface ValidatorStateType {
    totalStakeAmount: string
    myStakeAmount: string
    validatorMetadata: ValidatorType[]
    validators: Address[]
    isLoading: boolean
    isMetadataLoading: boolean
    isBalanceLoading: boolean
    isDelegatedAmountLoading: boolean
    isError: boolean
    errorMessage: string
    totalDelegators: number
    fuseTokenUSDPrice: number
    fuseTokenTotalSupply: number
    maxStakeAmount: string
    minStakeAmount: string
}

const INIT_STATE: ValidatorStateType = {
    totalDelegators: 0,
    totalStakeAmount: '0',
    myStakeAmount: '0',
    validatorMetadata: [],
    validators: [],
    isLoading: false,
    isMetadataLoading: false,
    isError: false,
    errorMessage: '',
    isBalanceLoading: false,
    fuseTokenUSDPrice: 0,
    fuseTokenTotalSupply: 0,
    isDelegatedAmountLoading: false,
    maxStakeAmount: '0',
    minStakeAmount: '0'
}

export const fetchValidators = createAsyncThunk(
    'VALIDATORS/FETCH',
    async (_undefined, thunkAPI) => {
        return new Promise<any>(async (resolve, reject) => {
            getTotalStakeAmount().then((totalStakeAmount) => {
                getValidators().then(async (validators) => {
                    const jailedValidators = await getJailedValidators()
                    validators = validators.concat(jailedValidators)
                    const fuseTokenTotalSupply = await fetchTotalSupply()
                    const maxStake = await getMaxStake()
                    const minStake = await getMinStake()
                    let price: number = 0
                    fetchTokenPrice("fuse-network-token").then(data => {
                        price = data
                        resolve({ totalStakeAmount, validators, price, fuseTokenTotalSupply, maxStake, minStake })
                    }).catch((e) => {
                        price = 0
                        resolve({ totalStakeAmount, validators, price, fuseTokenTotalSupply, maxStake, minStake })
                    })
                }).catch((error) => {
                    reject(error)
                })
            })
        })
    }
)

export const fetchValidatorMetadata = createAsyncThunk(
    'VALIDATORS/FETCH_METADATA',
    async (validators: Address[], thunkAPI) => {
        return new Promise<any>(async (resolve, reject) => {
            const validatorMetadata: Array<ValidatorType> = []
            let totalDelegators = 0
            const jailedValidators = await getJailedValidators()
            const pendingValidators = await getPendingValidators()
            const validatorMap = new Map<string, {
                name?: string,
                website?: string,
                image?: string
                description?: string
            }>(Object.entries(Validators));
            Promise.all(validators.map(async (validator) => {
                const status = jailedValidators.includes(validator.toLowerCase()) ? 'inactive' : 'active'
                const metadata = await fetchValidatorData(validator)
                const validatorData = validatorMap.get(validator)
                totalDelegators += parseInt(metadata.delegatorsLength)
                if (status === 'inactive') {
                    validatorMetadata.push({
                        ...metadata,
                        address: validator,
                        name: validatorData?.name ? validatorData?.name : validator,
                        website: validatorData?.website ? validatorData?.website : undefined,
                        image: validatorData?.image ? validatorData?.image : undefined,
                        status,
                        isPending: pendingValidators.includes(validator.toLowerCase()),
                        description: validatorData?.description ? validatorData?.description : undefined,
                    })
                } else {
                    try {
                        const { Node } = await fetchNodeByAddress(validator)
                        let apiMetadata = Node
                        validatorMetadata.push({
                            ...metadata,
                            address: validator,
                            name: validatorData?.name ? validatorData?.name : validator,
                            website: validatorData?.website ? validatorData?.website : undefined,
                            image: validatorData?.image ? validatorData?.image : undefined,
                            firstSeen: apiMetadata?.firstSeen ? apiMetadata?.firstSeen : undefined,
                            forDelegation: apiMetadata?.forDelegation ? apiMetadata?.forDelegation : undefined,
                            totalValidated: apiMetadata?.totalValidated ? apiMetadata?.totalValidated : undefined,
                            uptime: apiMetadata?.upTime ? apiMetadata?.upTime : undefined,
                            description: validatorData?.description ? validatorData?.description : undefined,
                            status,
                            isPending: pendingValidators.includes(validator.toLowerCase())
                        })
                    } catch (error) {
                        validatorMetadata.push({
                            ...metadata,
                            address: validator,
                            name: validator,
                            website: undefined,
                            image: undefined,
                            firstSeen: undefined,
                            forDelegation: undefined,
                            totalValidated: undefined,
                            uptime: undefined,
                            description: undefined,
                            status,
                            isPending: pendingValidators.includes(validator.toLowerCase())
                        })
                    }
                }
            })).then(() => {
                resolve({ validatorMetadata, totalDelegators })
            }).catch((error) => {
                reject(error)
            })
        })
    }
)

export const fetchSelfStake = createAsyncThunk(
    'VALIDATORS/FETCH_SELF_STAKE',
    async ({ address, validators }: { address: Address, validators: Address[] }, thunkAPI) => {
        return new Promise<any>(async (resolve, reject) => {
            const delegatedAmounts: [Address, string][] = []
            let amount = 0
            Promise.all(validators.map(async (validator) => {
                const delegatedAmount = await getStake(validator, address)
                amount += parseFloat(delegatedAmount)
                delegatedAmounts.push([validator, delegatedAmount])
            })).then(() => {
                resolve({ delegatedAmounts, amount })
            }).catch((error) => {
                reject(error)
            })
        })
    }
)

export const fetchDelegatedAmounts = createAsyncThunk(
    'VALIDATORS/FETCH_DELEGATED_AMOUNTS',
    async ({ address, delegators }: { address: Address, delegators: Address[] }, thunkAPI) => {
        return new Promise<any>(async (resolve, reject) => {
            let delegatedAmounts: [Address, string][] = []
            Promise.all(delegators.map(async (delegator) => {
                const delegatedAmount = await getDelegatedAmount(delegator, address)
                delegatedAmounts.push([delegator, delegatedAmount])
            })).then(() => {
                resolve({ delegatedAmounts, address })
            }).catch((error) => {
                reject(error)
            })
        })
    }
)




const validatorSlice = createSlice({
    name: 'VALIDATOR_STATE',
    initialState: INIT_STATE,
    reducers: {},
    extraReducers: {
        [fetchValidators.pending.toString()]: (state) => {
            state.isLoading = true
        },
        [fetchValidators.fulfilled.toString()]: (state, { payload }) => {
            state.isLoading = false
            state.totalStakeAmount = payload.totalStakeAmount
            state.validators = payload.validators
            state.fuseTokenUSDPrice = payload.price
            state.fuseTokenTotalSupply = payload.fuseTokenTotalSupply
            state.maxStakeAmount = payload.maxStake
            state.minStakeAmount = payload.minStake
        },
        [fetchValidators.rejected.toString()]: (state, { error }) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = error.message
        },
        [fetchValidatorMetadata.pending.toString()]: (state) => {
            state.isMetadataLoading = true
        },
        [fetchValidatorMetadata.fulfilled.toString()]: (state, { payload }) => {
            state.isMetadataLoading = false
            state.validatorMetadata = payload.validatorMetadata
            state.totalDelegators = payload.totalDelegators
        },
        [fetchValidatorMetadata.rejected.toString()]: (state, { error }) => {
            state.isMetadataLoading = false
            state.isError = true
            state.errorMessage = error.message
        },
        [fetchSelfStake.pending.toString()]: (state) => {
            state.isBalanceLoading = true
        },
        [fetchSelfStake.fulfilled.toString()]: (state, { payload }) => {
            state.isBalanceLoading = false
            state.myStakeAmount = payload.amount
            state.validatorMetadata = state.validatorMetadata.map((validator) => {
                const delegatedAmount = payload.delegatedAmounts.filter((delegatedAmount: Array<string>) => delegatedAmount[0] === validator.address)[0]
                return {
                    ...validator,
                    selfStakeAmount: delegatedAmount ? delegatedAmount[1] : '0'
                }
            })
        },
        [fetchSelfStake.rejected.toString()]: (state, { error }) => {
            state.isBalanceLoading = false
            state.isError = true
            state.errorMessage = error.message
        },
        [fetchDelegatedAmounts.pending.toString()]: (state) => {
            state.isDelegatedAmountLoading = true
        },
        [fetchDelegatedAmounts.fulfilled.toString()]: (state, { payload }) => {
            let validator = state.validatorMetadata.filter((validator) => validator.address === payload.address)[0]
            validator.delegators = (payload.delegatedAmounts).sort((a: [Address, string], b: [Address, string]) => {
                return parseInt(b[1]) - parseInt(a[1]);
            })
            const index = state.validatorMetadata.findIndex((validator) => validator.address === payload.address)
            state.validatorMetadata[index] = validator
            state.isDelegatedAmountLoading = false
        },
        [fetchDelegatedAmounts.rejected.toString()]: (state, { error }) => {
            state.isDelegatedAmountLoading = false
            state.isError = true
            state.errorMessage = error.message
        }
    }
})

export const selectValidatorSlice = (state: AppState): ValidatorStateType => state.validator
export const selectMaxStake = (state: AppState): string => state.validator.maxStakeAmount
export const selectMinStake = (state: AppState): string => state.validator.minStakeAmount

export default validatorSlice.reducer