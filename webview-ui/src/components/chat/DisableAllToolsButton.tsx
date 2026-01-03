import React, { useState, useEffect } from "react"
import { Wrench } from "lucide-react"

import { cn } from "@src/lib/utils"
import { vscode } from "@src/utils/vscode"
import { useAppTranslation } from "@/i18n/TranslationContext"

import { useExtensionState } from "@src/context/ExtensionStateContext"
import { StandardTooltip } from "@src/components/ui"

interface DisableAllToolsButtonProps {
	className?: string
	onToggle?: (enabled: boolean) => void
}

export const DisableAllToolsButton: React.FC<DisableAllToolsButtonProps> = ({ className, onToggle }) => {
	const { t } = useAppTranslation()
	const { disableAllTools } = useExtensionState()
	const [isDisabled, setIsDisabled] = useState(disableAllTools ?? false)

	useEffect(() => {
		setIsDisabled(disableAllTools ?? false)
	}, [disableAllTools])

	const handleClick = () => {
		const newState = !isDisabled
		setIsDisabled(newState)
		vscode.postMessage({
			type: "toggleDisableAllTools",
			enabled: newState,
		})
		onToggle?.(newState)
	}

	return (
		<StandardTooltip content={isDisabled ? "Enable Function Tools" : "Disable Function Tools"}>
			<button
				aria-label={isDisabled ? "Enable Function Tools" : "Disable Function Tools"}
				onClick={handleClick}
				className={cn(
					"relative inline-flex items-center justify-center",
					"bg-transparent border-none p-1.5",
					"rounded-md min-w-[28px] min-h-[28px]",
					"text-vscode-foreground",
					"transition-all duration-150",
					"focus:outline-none focus-visible:ring-1 focus-visible:ring-vscode-focusBorder",
					"cursor-pointer",
					isDisabled
						? "opacity-100 bg-[rgba(255,100,100,0.15)] hover:bg-[rgba(255,100,100,0.25)]"
						: "opacity-85 hover:opacity-100 hover:bg-[rgba(255,255,255,0.03)]",
					className,
				)}>
				<Wrench className={cn("w-4 h-4", isDisabled && "text-[rgb(255,100,100)]")} />
				{isDisabled && (
					<span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[rgb(255,100,100)] rounded-full" />
				)}
			</button>
		</StandardTooltip>
	)
}
