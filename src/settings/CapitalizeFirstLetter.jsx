

export default function CapitalizeFirstLetter({ text }) {
    return String(text.charAt(0).toUpperCase() + text.slice(1));
}
