import _ from 'underscore';
import lodashGet from 'lodash/get';
import CONST from '../CONST';
import ONYXKEYS from '../ONYXKEYS';

/**
* Checks if we have any errors stored within the POLICY_MEMBER_LIST.  Determines whether we should show a red brick road error or not
 * Data structure: {email: {role:'bla', errors: []}, email2: {role:'bla', errors: [{1231312313: 'Unable to do X'}]}, ...}
 * @param {Object} policyMemberList
 * @returns {Boolean}
 */
function hasPolicyMemberError(policyMemberList) {
    return _.some(policyMemberList, member => !_.isEmpty(member.errors));
}

/**
 * The policy has an error if there are errors under errors or errorFields.
 * @param {Object} policy
 * @return {Boolean}
 */
function policyHasError(policy) {
    const errors = lodashGet(policy, 'errors', {});
    const errorFields = lodashGet(policy, 'errorFields', {});
    const hasFieldErrors = _.some(errorFields, fieldErrors => !_.isEmpty(fieldErrors));
    return !_.isEmpty(errors) || hasFieldErrors;
}

function getWorkspaceBrickRoadIndicatorStatus(policy, policyMembers) {
    const policyMemberList = lodashGet(policyMembers, `${ONYXKEYS.COLLECTION.POLICY_MEMBER_LIST}${policy.id}`, {});
    if (hasPolicyMemberError(policyMemberList) || policyHasError(policy)) {
        return CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR;
    }
    return '';
}

export {
    hasPolicyMemberError,
    policyHasError,
    getWorkspaceBrickRoadIndicatorStatus,
};
