import type { TableRow } from "@nuxt/ui"

export const headerClass = 'px-5 py-4 text-left text-xs font-semibold uppercase text-brand-text'
export const cellClass = 'px-5 py-4 align-top text-brand-text/70'

export const defaultColumnMeta = {
    class: {
        th: headerClass,
        td: cellClass
    }
}

export const createTableMeta = <T>() => ({
    class: {
        tr: (_row:TableRow<T>) => 'cursor-pointer transition-colors duration-150 hover:bg-brand-bg/50'
    }
})