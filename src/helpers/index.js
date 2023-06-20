export const truncate = (input) => {
    return input?.length > 250 ? `${input.substring(0, 250)}...` : input;
}